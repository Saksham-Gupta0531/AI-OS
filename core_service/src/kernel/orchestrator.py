import queue
import time
import threading
from enum import Enum
from dataclasses import dataclass, field
from typing import Dict, Any

from .agents import get_agent # Now importing the dynamic registry
from .memory import MemoryManager
from .security import SecurityManager

class TaskPriority(Enum):
    CRITICAL = 0   # User commands
    HIGH = 1       # Agent sub-tasks
    BACKGROUND = 2 # File indexing, cleanup

@dataclass(order=True)
class Task:
    priority: int
    task_id: str = field(compare=False)
    agent_type: str = field(compare=False)
    payload: Dict[str, Any] = field(compare=False)
    retry_count: int = field(compare=False, default=0)

class Orchestrator:
    def __init__(self):
        self.task_queue = queue.PriorityQueue()
        self.memory = MemoryManager()
        self.security = SecurityManager()
        self.is_running = True
        self.MAX_RETRIES = 3

    def submit_task(self, task_id: str, agent_type: str, payload: dict, priority: TaskPriority = TaskPriority.HIGH):
        task = Task(priority=priority.value, task_id=task_id, agent_type=agent_type, payload=payload)
        self.task_queue.put(task)
        print(f"[Queue] Task {task_id} added for {agent_type}.")

    def start(self):
        thread = threading.Thread(target=self._run_loop, daemon=True)
        thread.start()
        print("[System] AI-OS Orchestrator Kernel Running...")

    def _run_loop(self):
        while self.is_running:
            try:
                task = self.task_queue.get(timeout=1)
                self._execute_agent(task)
                self.task_queue.task_done()
                time.sleep(1) 
            except queue.Empty:
                continue

    def _execute_agent(self, task: Task):
        print(f"\n[Processing] Task: {task.task_id} | Agent: {task.agent_type}")

        # 1. Concurrency Check
        target_file = task.payload.get('file_path')
        if target_file:
            if not self.memory.acquire_lock(target_file, task.agent_type):
                print(f"[Lock] File {target_file} is locked. Re-queueing task.")
                time.sleep(1) 
                self.task_queue.put(task)
                return

        try:
            # 2. Fetch the correct agent from the Registry
            agent_instance = get_agent(task.agent_type)
            if not agent_instance:
                raise ValueError(f"Unknown agent type requested: {task.agent_type}")

            prompt_preview = task.payload.get('prompt', '')[:50]
            print(f"[Agent Runtime] Executing logic for prompt: '{prompt_preview}...'")
            
            # 3. Execute the agent's specific logic (which handles its own LLM calls)
            response = agent_instance.execute(task.payload)
            
            print(f"[Result] Task {task.task_id} completed. Response length: {len(response)} chars")
            
            task.payload['result'] = response

            # 4. Update memory context
            self.memory.update_context("last_action", {
                "task_id": task.task_id, 
                "agent": task.agent_type,
                "status": "success"
            })

            # For testing purposes, print the actual output
            print("-" * 40)
            print(response)
            print("-" * 40)

        except Exception as e:
            print(f"[Error] Task {task.task_id}: {str(e)}")
            if task.retry_count < self.MAX_RETRIES:
                task.retry_count += 1
                print(f"[Retry] Retrying... ({task.retry_count}/{self.MAX_RETRIES})")
                self.task_queue.put(task)
            else:
                print(f"[Failed] Task {task.task_id} failed after max retries.")

        finally:
            if target_file:
                self.memory.release_lock(target_file, task.agent_type)