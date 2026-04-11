
from core_service.src.kernel.agents.Developer.architect import ArchitectAgent
from core_service.src.kernel.agents.Common.Focus_agent import FocusGuardianAgent

AGENT_REGISTRY = {
    "architectagent": ArchitectAgent(),
    "focusagent":FocusGuardianAgent(),
}

def get_agents(agent_type: str):
    return AGENT_REGISTRY.get(agent_type.lower())