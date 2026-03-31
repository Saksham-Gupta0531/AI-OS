
from core_service.src.kernel.agents.Developer.architect import ArchitectAgent

AGENT_REGISTRY = {
    "architectagent": ArchitectAgent(),
}

def get_agents(agent_type: str):
    return AGENT_REGISTRY.get(agent_type.lower())