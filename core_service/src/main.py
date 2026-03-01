from kernel.orchestrator import Orchestrator, TaskPriority
import time

os_kernel = Orchestrator()
os_kernel.start()

os_kernel.submit_task(
    task_id="ARCH_REQ_001",
    agent_type="ArchitectAgent",
    payload={
        "action": "init",
        "prompt": "I want to build a real-time chat app with 10k users."
    },
    priority=TaskPriority.CRITICAL
)

try:
    while True:
        time.sleep(1)
except KeyboardInterrupt:
    print("\nShutting down AI-OS...")