import uuid
import asyncio
import threading
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from src.kernel.orchestrator import Orchestrator, TaskPriority


router = APIRouter()

os_kernel = Orchestrator()
os_kernel.start()

class PromptRequest(BaseModel):
    agentId: int
    agentName: str
    prompt: str
    sessionId: str = "default_api_session"

@router.post("/callAgent")
async def process_agent_prompt(request: PromptRequest):
    try:
        print(request)
        task_id = f"API_TASK_{uuid.uuid4().hex[:8]}"
        completion_event = threading.Event()
        payload = {
            "session_id": request.sessionId,
            "action": "init",
            "prompt": request.prompt,
            "completion_event": completion_event
        }
        
        os_kernel.submit_task(
            task_id=task_id,
            agent_type=request.agentName,
            payload=payload,
            priority=TaskPriority.CRITICAL
        )
        
        await asyncio.to_thread(completion_event.wait, timeout=120.0)
        
        execution_result = payload.get("result", "Error: Task timed out or failed to execute.")

        return {
            "status": "success",
            "agent": request.agentName,
            "received_prompt": request.prompt,
            "execution_result": execution_result
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/health")
async def health_check():
    return {"status": "online", "service": "AI OS Core"}