import { useState, useRef, useEffect } from "react";
import { Send, ChevronUp, Bot, Cpu, Check } from "lucide-react";
import "./Prompt.css";

const agents = [
  { id: "architect", name: "Architect Agent", desc: "System design & planning" },
  { id: "focus", name: "Focus Agent", desc: "Deep single-task execution" },
  { id: "research", name: "Research Agent", desc: "Web search & analysis" },
  { id: "code", name: "Code Agent", desc: "Write & debug code" },
];

const models = [
  { id: "llama", name: "Llama 3.3 70B", tag: "META" },
  { id: "gpt-oss", name: "GPT OSS 120B", tag: "OAI" },
  { id: "mistral", name: "Mistral 8x22B", tag: "MIS" },
  { id: "deepseek", name: "DeepSeek R2", tag: "DS" },
];

function Dropdown({ open, onClose, children }) {
  const ref = useRef();
  
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { 
      if (ref.current && !ref.current.contains(e.target)) onClose(); 
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, onClose]);
  
  return <div ref={ref} style={{ position: "relative" }}>{children}</div>;
}

function Prompt() {
  const [text, setText] = useState("");
  const [agentOpen, setAgentOpen] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(agents[0]);
  const [selectedModel, setSelectedModel] = useState(models[0]);
  const textareaRef = useRef();

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { 
      e.preventDefault(); 
      handleSend(); 
    }
  };
  
  const handleSend = () => { 
    if (text.trim()) {
      console.log("Sending:", text, "with", selectedAgent.name, "and", selectedModel.name);
      setText(""); 
    }
  };

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 160) + "px";
  }, [text]);

  return (
    <div className="prompt-root">
      <div className="prompt-toolbar">
        {/* LEFT — Agent selector */}
        <Dropdown open={agentOpen} onClose={() => setAgentOpen(false)}>
          <div
            className={`dd-trigger ${agentOpen ? "open" : ""}`}
            onClick={() => { setAgentOpen(!agentOpen); setModelOpen(false); }}
          >
            <Bot style={{ width: 13, height: 13 }} />
            {selectedAgent.name}
            <ChevronUp className="chevron" />
          </div>
          {agentOpen && (
            <div className="dd-panel left">
              <div className="dd-header">Select Agent</div>
              {agents.map((a) => (
                <div
                  key={a.id}
                  className={`dd-option ${selectedAgent.id === a.id ? "selected" : ""}`}
                  onClick={() => { setSelectedAgent(a); setAgentOpen(false); }}
                >
                  <div>
                    <div className="dd-option-name">{a.name}</div>
                    <div className="dd-option-desc">{a.desc}</div>
                  </div>
                  {selectedAgent.id === a.id && <Check className="check" />}
                </div>
              ))}
            </div>
          )}
        </Dropdown>

        {/* RIGHT — Model selector */}
        <Dropdown open={modelOpen} onClose={() => setModelOpen(false)}>
          <div
            className={`dd-trigger ${modelOpen ? "open" : ""}`}
            onClick={() => { setModelOpen(!modelOpen); setAgentOpen(false); }}
          >
            <Cpu style={{ width: 13, height: 13 }} />
            {selectedModel.name}
            <span className="dd-tag">{selectedModel.tag}</span>
            <ChevronUp className="chevron" />
          </div>
          {modelOpen && (
            <div className="dd-panel right">
              <div className="dd-header">Select Model</div>
              {models.map((m) => (
                <div
                  key={m.id}
                  className={`dd-option ${selectedModel.id === m.id ? "selected" : ""}`}
                  onClick={() => { setSelectedModel(m); setModelOpen(false); }}
                >
                  <div>
                    <div className="dd-option-name">{m.name}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span className="dd-tag">{m.tag}</span>
                    {selectedModel.id === m.id && <Check className="check" />}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Dropdown>
      </div>

      <div className="prompt-box">
        <textarea
          ref={textareaRef}
          className="prompt-textarea"
          placeholder="// Enter your prompt... (Shift+Enter for new line)"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
        />
        <div className="prompt-box-corner" />
        <button
          className={`send-btn ${text.trim() ? "active" : ""}`}
          onClick={handleSend}
        >
          <Send />
        </button>
      </div>
    </div>
  );
}

export default Prompt;