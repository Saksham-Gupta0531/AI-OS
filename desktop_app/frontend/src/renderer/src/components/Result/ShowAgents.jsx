import { useState } from "react";
import "./ShowAgents.css";
import { Search } from 'lucide-react';
import ArchitectAgent from '../Agents/ArchitectAgent.jsx';

//Change:- List ALL Agent From Backend 
const agents = [
    { id: 1, name: "Architect", role: "System Design", status: "online", icon: "⬡" },
    { id: 2, name: "Focus", role: "Stay Focused", status: "online", icon: "◈" },
    { id: 3, name: "ARIA", role: "Assistant", status: "idle", icon: "◎" },
    { id: 4, name: "VECTOR", role: "Code Runner", status: "online", icon: "⬢" },
    { id: 5, name: "PHANTOM", role: "Web Crawler", status: "offline", icon: "◇" },
    { id: 6, name: "ORACLE", role: "Predictor", status: "idle", icon: "◉" },
];

function ShowAgents({ setWhichAgent }) {
    const [query, setQuery] = useState("");

    function handleAgentClick(id) {
        if (id !== 0) {
            setWhichAgent(id);
        }
    }
    //Change:- List ALL Agent From Backend 
    const filtered = agents.filter((a) =>
        a.name.toLowerCase().includes(query.toLowerCase()) ||
        a.role.toLowerCase().includes(query.toLowerCase())
    );

    const statusColor = {
        online: "#00fff7",
        idle: "#f0c040",
        offline: "#ff3c6e",
    };

    return (
        <div className={`agent-container centered`}>
            <div className="agent-search-list">
                <div className="search-wrapper flex items-center">
                    <Search className="mx-1" color="#f0c040" size={16} />
                    <input type="text" className="search-input" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search for Agents" />
                </div>

                <div className="agent-list">
                    {filtered.length === 0 ? (
                        <div className="no-results">[ NO AGENTS FOUND ]</div>
                    ) : (
                        filtered.map((agent) => (
                            <div key={agent.id} onClick={() => handleAgentClick(agent.id)} className="agent-item" >
                                <div className="agent-icon-box"
                                    style={{
                                        border: `1.5px solid ${statusColor[agent.status]}40`,
                                        background: `${statusColor[agent.status]}10`,
                                        color: statusColor[agent.status],
                                        boxShadow: `0 0 8px ${statusColor[agent.status]}30`,
                                    }}
                                >
                                    {agent.icon}
                                </div>

                                <div className="agent-info">
                                    <div className="agent-name">{agent.name}</div>
                                    <div className="agent-role">{agent.role}</div>
                                </div>

                                <div className="status-badge" style={{ color: statusColor[agent.status] }}>
                                    <span className={`status-dot ${agent.status === "online" ? "pulse" : ""}`}
                                        style={{
                                            background: statusColor[agent.status],
                                            boxShadow: `0 0 6px ${statusColor[agent.status]}`,
                                        }}
                                    />
                                    {agent.status.toUpperCase()}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

        </div>
    );
}

export default ShowAgents;