import os
import sys
import time
import tkinter as tk
from tkinter import simpledialog
from kernel.orchestrator import Orchestrator, TaskPriority
from kernel.agents.Common.Focus_agent import FocusGuardianAgent

def ask_user_goal():
    """Dynamically asks the user for their focus goal before OS starts."""
    root = tk.Tk()
    root.withdraw() # Hide the main tk window
    
    goal = simpledialog.askstring("AI-OS Focus Agent", "What is your focus goal for this session? \n(e.g., Study GenAI, Watch Web Series, etc.)")
    
    if not goal: # If user cancels
        root.destroy()
        return None, None
        
    duration = simpledialog.askfloat("AI-OS Focus Agent", "For how many hours? \n(e.g., 2.5 or 3)", initialvalue=3.0)
    root.destroy()
    return goal, duration

print("Initializing AI-OS...")

# 1. Ask for Focus Goal dynamically using Tkinter
user_goal, duration_hours = ask_user_goal()

if user_goal and duration_hours:
    # 🚨 FIX: Yahan se memory_manager hata diya gaya hai!
    focus_agent = FocusGuardianAgent(task_description=user_goal, duration_hours=duration_hours)
    focus_agent.start()
else:
    print("[System] No goal specified. Focus Agent is disabled for this session.")

# 2. Start AI-OS Kernel
os_kernel = Orchestrator()
os_kernel.start()

# 3. Submit standard AI-OS tasks (Just for your background OS testing)
# os_kernel.submit_task(
#     task_id="CHAT_001",
#     agent_type="ArchitectAgent",
#     payload={
#         "session_id": "chat_app_project_123",
#         "action": "init",
#         "prompt": "I want to build a real-time chat app with 10k users."
#     },
#     priority=TaskPriority.CRITICAL
# )

try:
    while True:
        time.sleep(1)
except KeyboardInterrupt:
    print("\nShutting down AI-OS...")
    sys.exit(0)
    