# core_service/src/kernel/agents/architect.py
import json
from ...brain import ask_llama3

class ArchitectAgent:
    def __init__(self):
        self.system_role = """You are an expert Principal Software Engineer and System Architect. 
        Your job is to design scalable, clean, production-ready architectures.
        
        When asked to generate a project, provide:
        1. A high-level architecture overview.
        2. A recommended tech stack.
        3. A JSON representation of the folder structure.
        4. A Mermaid.js diagram of the architecture.
        
        Do not write full application code. Focus entirely on structure, patterns, and modularity."""

    def execute(self, payload: dict) -> str:
        """
        The entry point for this specific agent.
        """
        prompt = payload.get("prompt", "")
        action = payload.get("action", "init")

        if action == "init":
            # Workflow 1: New Project
            full_prompt = f"Design a system architecture and folder structure for the following request: {prompt}"
            return ask_llama3(full_prompt, system_role=self.system_role)
            
        elif action == "analyze":
            # Workflow 2: Architecture Review
            # (Later, we will inject the output of fs_scanner.py here)
            project_tree = payload.get("project_tree", "No tree provided.")
            full_prompt = f"Review this project structure for anti-patterns and suggest refactoring:\n\n{project_tree}"
            return ask_llama3(full_prompt, system_role=self.system_role)

        else:
            return "Error: Unknown action for ArchitectAgent."