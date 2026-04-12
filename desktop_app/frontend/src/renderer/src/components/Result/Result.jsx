import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ShowAgents from './ShowAgents.jsx';
import ArchitectAgent from '../Agents/ArchitectAgent.jsx';
import FocusAgent from '../Agents/FocusAgent.jsx';
import CodeCheaterAgent from '../Agents/CodeCheaterAgent.jsx';
import Prompt from "../Prompt/Prompt";

function Result() {
    const [whichAgent, setWhichAgent] = useState(0);

    const [sessionId, setSessionId] = useState("");
    const [AgentResult, setAgentResult] = useState(null);

    useEffect(() => {
        if (whichAgent !== 0) {
            setSessionId(`agent_session_${uuidv4()}`);
            setAgentResult(null);
        }
    }, [whichAgent]);

    const handleAiResponse = (aiText) => {
        setAgentResult({ result: aiText });
    };
    const getActiveAgentProps = () => {
        if (whichAgent === 1) return { agentId: 1, agentName: 'architectagent' };
        return null;
    };

    const activeAgent = getActiveAgentProps();

    return (
        <div className='flex flex-col w-full h-full'>
            <div className="flex-1 w-full overflow-hidden">
                {whichAgent === 0 && <ShowAgents setWhichAgent={setWhichAgent} />}

                {whichAgent === 1 && (
                    <ArchitectAgent agentData={AgentResult} />
                )}

                {whichAgent === 2 && (
                    <FocusAgent sessionId={sessionId} />
                )}
                {whichAgent === 3 && (
                    <CodeCheaterAgent sessionId={sessionId} />
                )}
            </div>

            {activeAgent && (
                <div className="w-full shrink-0">
                    <Prompt
                        agent={activeAgent}
                        sessionId={sessionId}
                        onResponse={handleAiResponse}
                    />
                </div>
            )}
        </div>
    );
}


export default Result;