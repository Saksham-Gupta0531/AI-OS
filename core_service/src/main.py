from kernel.orchestrator import Orchestrator, TaskPriority
import time


os_kernel = Orchestrator()
os_kernel.start()

os_kernel.submit_task(
    task_id="USER_REQ_001",
    agent_type="DevAgent",
    payload={"prompt": "Fix the bug in main.py", "file_path": "main.py"},
    priority=TaskPriority.CRITICAL
)

os_kernel.submit_task(
    task_id="SYS_INDEX_001",
    agent_type="FileScout",
    payload={"prompt": "Index all PDF files"},
    priority=TaskPriority.BACKGROUND
)

try:
    while True:
        time.sleep(1)
except KeyboardInterrupt:
    print("Shutting down...")