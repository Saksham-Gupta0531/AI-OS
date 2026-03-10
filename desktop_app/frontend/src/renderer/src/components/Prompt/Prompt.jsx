import { useState, useRef, useEffect } from "react";
import { Send, ChevronUp, Bot, Cpu, Check } from "lucide-react";
import "./Prompt.css";
import PromptApi from './PromptApi';

function Prompt() {
  const [text, setText] = useState("");
  const textareaRef = useRef();

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (text.trim()) {
      PromptApi(text)
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
      <div className="prompt-box">
        <textarea
          ref={textareaRef}
          className="prompt-textarea"
          placeholder="Enter your prompt... (Shift+Enter for new line)"
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