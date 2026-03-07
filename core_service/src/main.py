import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api import agents, sessions

app = FastAPI(title="AI-OS Core Service")

# Allow Electron (Localhost) to communicate with this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(agents.router, prefix="/api/agents")
app.include_router(sessions.router, prefix="/api/sessions")

if __name__ == "__main__":
    # Start the kernel logic thread
    print("Initializing AI-OS Kernel...")
    uvicorn.run(app, host="127.0.0.1", port=8111)