import { useState, useEffect } from "react";
import Prompt from "../Prompt/Prompt";
import { v4 as uuidv4 } from "uuid";
import "./ArchitectAgent.css";

const TABS = ["Overview", "TechStack", "JSON Structure", "Diagram"];

function ArchitectAgent({ data }) {
    const [activeTab, setActiveTab] = useState("Overview");
    const [sessionId, setSessionId] = useState("");

    useEffect(() => {
        setSessionId(`arch_session_${uuidv4()}`);
    }, []);

    const handleNewChat = () => {
        setSessionId(`arch_session_${uuidv4()}`);
    };

    const renderContent = () => {
        switch (activeTab) {
            case "Overview":
                return data?.overview || data?.result || "No overview data available.";
            case "TechStack":
                return data?.techStack
                    ? typeof data.techStack === "object"
                        ? JSON.stringify(data.techStack, null, 2)
                        : data.techStack
                    : "No tech stack data available.";
            case "JSON Structure":
                return data
                    ? JSON.stringify(data, null, 2)
                    : "No JSON structure available.";
            case "Diagram":
                return data?.diagram || "No diagram data available.";
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col w-full h-full p-5 border-2 border-gray-700 text-[#e0f7fa] architect-container">
            <div className="flex items-end w-full pb-1 ml-4 gap-1 shrink-0">
                {TABS.map((tab) => (
                    <button
                        key={tab}
                        className={`cyber-tab ${activeTab === tab ? "active" : ""}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
                <div className="decorative-line" />
            </div>

            <div className="relative flex-1 p-4 mt-2 mb-5 overflow-x-hidden overflow-y-auto border rounded-sm border-[#00fff730] bg-[#060d18] cyber-panel">
                <div className="corner-tl" /><div className="corner-tr" />
                <div className="corner-bl" /><div className="corner-br" />
                <div className="scan-line" />

                <div className="tab-watermark">
                    {activeTab}
                </div>

                <pre key={activeTab} className="whitespace-pre-wrap text-sm content-panel">
                    {renderContent()}
                </pre>
            </div>

            <div className="w-full shrink-0">
                <Prompt agent={{ agentId: 1, agentName: 'ArchitectAgent' }} sessionId={sessionId}/>
            </div>
        </div>
    );
}

export default ArchitectAgent;