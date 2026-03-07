import time
import threading
import customtkinter as ctk 
import pygetwindow as gw
import pyautogui 
import logging
from kernel.brain import ask_llama3

ctk.set_appearance_mode("Dark")
ctk.set_default_color_theme("blue")

class FocusGuardianAgent(threading.Thread):
    def __init__(self, task_description, duration_hours=3.0, check_interval=3):
        super().__init__(daemon=True)
        self.task_description = task_description
        self.end_time = time.time() + (float(duration_hours) * 3600)
        self.check_interval = check_interval
        
        self.snooze_used = False
        self.snooze_until = 0
        self.running = False
        self.last_allowed_window = None

    def evaluate_window(self, window_title):
        system_role = "You are 'FocusGuardian', an uncompromising, highly logical OS-level productivity enforcer agent."
        
        prompt = f"""
USER'S DECLARED GOAL: "{self.task_description}"
CURRENT ACTIVE WINDOW TITLE: "{window_title}"

INSTRUCTIONS FOR ANALYSIS:
You are an objective evaluator. Determine if the active window facilitates the user's declared goal.

1. Objective Evaluation Rules:
   - NEUTRAL NAVIGATION (CRITICAL): If the window is a generic browser tab (e.g., 'New Tab - Google Chrome', 'Google', 'Search') or a base platform homepage without specific video/article content (e.g., just 'YouTube' or 'YouTube - Google Chrome'), you MUST -> ALLOW. Users need these to search for their work.
   - CONTENT RELEVANCE: For specific content/videos, evaluate the title. If it aligns with or teaches the goal -> ALLOW.
   - GOAL DIVERGENCE: If specific content is visibly unrelated to the goal (e.g., gaming video while studying) -> BLOCK.
   - AI & FOUNDATIONAL UTILITIES: Universally allow OS utilities, IDEs (VS Code), text editors, and AI assistants (ChatGPT, Google Gemini, Claude, Perplexity) -> ALLOW.

CRITICAL FORMATTING RULE:
Output EXACTLY ONE WORD. No punctuation. No explanations.
Valid outputs ONLY: ALLOW or BLOCK
"""
        try:
            response = ask_llama3(prompt=prompt, system_role=system_role)
            decision = response.strip().upper()
            return "ALLOW" if "ALLOW" in decision else "BLOCK"
        except Exception as e:
            logging.error(f"[Focus Agent] Brain evaluation failed: {e}")
            return "ALLOW"

    def show_warning_popup(self, blocked_window, previous_window):
        """Top-right popup with an auto-close timer and smart tab closing"""
        root = ctk.CTk()
        root.title("AI-OS Focus Alert")
        root.attributes("-topmost", True)
        
        window_width = 450
        window_height = 220
        
        # Position in Top Right Corner
        root.update_idletasks()
        screen_width = root.winfo_screenwidth()
        x = screen_width - window_width - 20
        y = 30 
        root.geometry(f"{window_width}x{window_height}+{x}+{y}")

        # UI Elements
        ctk.CTkLabel(root, text="Distraction Detected!", text_color="#ff4444", font=("Arial", 20, "bold")).pack(pady=(15, 5))
        ctk.CTkLabel(root, text=f"Goal: {self.task_description}", text_color="white", font=("Arial", 14)).pack()
        
        safe_title = blocked_window.title.encode('ascii', 'ignore').decode('ascii')
        ctk.CTkLabel(root, text=f"Window: {safe_title[:40]}...", text_color="gray", font=("Arial", 12)).pack(pady=(5, 10))

        time_left = 5
        timer_label = ctk.CTkLabel(root, text=f"Auto-closing in {time_left}s...", text_color="#ff4444", font=("Arial", 12, "bold"))
        timer_label.pack()

        timer_id = None

        def clean_shutdown():
            """Safely cancels timers and destroys the window to prevent Tcl thread errors."""
            try:
                if timer_id:
                    root.after_cancel(timer_id)
                root.destroy()
            except Exception as e:
                pass

        def close_distraction():
            """SMART CLOSE: Closes tabs for browsers, closes apps for desktop software."""
            try:
                title_lower = safe_title.lower()
                browsers = ['chrome', 'edge', 'firefox', 'brave', 'opera', 'safari']
                is_browser = any(b in title_lower for b in browsers)

                if is_browser:
                    print(f"[Focus Guardian] Sending Ctrl+W to close browser tab...")
                    blocked_window.activate()
                    time.sleep(0.2) 
                    pyautogui.hotkey('ctrl', 'w')
                else:
                    print(f"[Focus Guardian] Closing entire desktop application...")
                    blocked_window.close() 
            except Exception as e:
                print(f"[Focus Guardian] Error closing distraction: {e}")
            
            clean_shutdown()

        def go_to_previous():
            try:
                if previous_window:
                    previous_window.activate()
            except:
                pass
            clean_shutdown()

        def snooze():
            self.snooze_used = True
            self.snooze_until = time.time() + 300 
            clean_shutdown()

        def update_timer():
            nonlocal time_left, timer_id
            if not root.winfo_exists():
                return
                
            if time_left > 0:
                time_left -= 1
                timer_label.configure(text=f"Auto-closing in {time_left}s...")
                timer_id = root.after(1000, update_timer)
            else:
                close_distraction()

        btn_frame = ctk.CTkFrame(root, fg_color="transparent")
        btn_frame.pack(pady=10)

        ctk.CTkButton(btn_frame, text="Close Now", width=100, fg_color="#ff4444", hover_color="#cc0000", command=close_distraction).pack(side=ctk.LEFT, padx=5)
        ctk.CTkButton(btn_frame, text="Go Back", width=100, fg_color="#4CAF50", hover_color="#388E3C", command=go_to_previous).pack(side=ctk.LEFT, padx=5)

        if not self.snooze_used:
            ctk.CTkButton(btn_frame, text="Snooze (5m)", width=100, fg_color="#ff9800", text_color="black", hover_color="#e68a00", command=snooze).pack(side=ctk.LEFT, padx=5)

        timer_id = root.after(1000, update_timer)
        root.mainloop()

    def run(self):
        self.running = True
        print(f"\n[AI-OS Focus Guardian] Active. Goal: '{self.task_description}'")
        
        last_checked_title = ""
        current_verdict = "ALLOW"
        distraction_start = 0

        while self.running and time.time() < self.end_time:
            if time.time() < self.snooze_until:
                time.sleep(self.check_interval)
                continue

            try:
                current_window = gw.getActiveWindow()
                if not current_window or not current_window.title.strip():
                    time.sleep(self.check_interval)
                    continue

                current_title = current_window.title.strip()

                if current_title != last_checked_title:
                    last_checked_title = current_title
                    current_verdict = self.evaluate_window(current_title)
                    
                    if current_verdict == "BLOCK":
                        distraction_start = time.time() 
                    else:
                        self.last_allowed_window = current_window
                        distraction_start = 0

                if current_verdict == "BLOCK" and distraction_start > 0:
                    if time.time() - distraction_start >= 5: 
                        safe_print_title = current_title.encode('ascii', 'ignore').decode('ascii')
                        print(f"[Focus Guardian] Distraction Blocked: {safe_print_title}")
                        
                        self.show_warning_popup(current_window, self.last_allowed_window)
                        
                        last_checked_title = "" 
                        distraction_start = 0
                        current_verdict = "ALLOW"

            except Exception:
                pass 
            
            time.sleep(self.check_interval)
            
        print("\n[AI-OS Focus Guardian] Session complete.")


if __name__ == "__main__":
    test_goal = "I want to watch Gaming video on youtube for 2 hours"
    print(f"Starting isolated test for goal: {test_goal}")

    agent = FocusGuardianAgent(
        task_description=test_goal, 
        duration_hours=0.1, 
        check_interval=1 
    )
    
    agent.start()

    try:
        while True:
            time.sleep(1)
            
    except KeyboardInterrupt:
        print("\nTest stopped by user.")