import queue
import time
import threading
from enum import Enum
from dataclasses import dataclass, field
from typing import Dict, Any

from .memory import MemoryManager
from .security import SecurityManager
from .brain import ask_llama3  

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
        """External entry point to add tasks."""
        task = Task(priority=priority.value, task_id=task_id, agent_type=agent_type, payload=payload)
        self.task_queue.put(task)
        print(f"[Queue] Task {task_id} added.")

    def start(self):
        """Starts the kernel loop in a separate thread."""
        thread = threading.Thread(target=self._run_loop, daemon=True)
        thread.start()
        print("[System] AI-OS Orchestrator Kernel Running...")

    def _run_loop(self):
        while self.is_running:
            try:
                task = self.task_queue.get(timeout=1)
                self._execute_agent(task)
                self.task_queue.task_done()
                time.sleep(3) 
            except queue.Empty:
                continue

    def _execute_agent(self, task: Task):
        print(f"[Processing] {task.task_id} (Agent: {task.agent_type})")

        target_file = task.payload.get('file_path')
        if target_file:
            if not self.memory.acquire_lock(target_file, task.agent_type):
                print(f"[Lock] File {target_file} is locked. Re-queueing task.")
                time.sleep(1) 
                self.task_queue.put(task)
                return

        try:
            prompt_preview = task.payload.get('prompt', '')[:50]
            print(f"[Groq-70B] Sending prompt: {prompt_preview}...")
            
            # Determine the System Role based on Agent Type
            role = "You are a helpful AI Operating System assistant."
            if task.agent_type == "DevAgent":
                role = "You are an expert Developer Agent. Write only code."
            elif task.agent_type == "StudentAgent":
                role = "You are a helpful teacher. Explain concepts simply."

            response = ask_llama3(task.payload.get('prompt'), system_role=role)
            
            print(f"[Result] Answer received (length: {len(response)})")
            
            task.payload['result'] = response

            self.memory.update_context("last_action", {
                "task_id": task.task_id, 
                "agent": task.agent_type,
                "status": "success"
            })

        except Exception as e:
            print(f"[Error] Task {task.task_id}: {str(e)}")
            if task.retry_count < self.MAX_RETRIES:
                task.retry_count += 1
                print(f"[Retry] Retrying... ({task.retry_count}/{self.MAX_RETRIES})")
                self.task_queue.put(task)
            else:
                print("[Failed] Task failed after max retries.")

        finally:
            if target_file:
                self.memory.release_lock(target_file, task.agent_type)