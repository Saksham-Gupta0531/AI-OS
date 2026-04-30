import React, { useState } from 'react';

export default function Dashboard() {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState([
    "AI-OS Kernel initialized.",
    "System ready. Awaiting commands..."
  ]);

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    if (!command.trim()) return;
    
    setOutput(prev => [...prev, `> ${command}`, "Command execution not available in dummy UI mode."]);
    setCommand('');
  };

  return (
    <div className="animate-fade-in w-full max-w-5xl mx-auto mt-4">
      
      {/* Top Bar like in screenshot */}
      <div className="flex items-center justify-between mb-8 bg-[#0a0a0a] border border-gray-800 p-4 rounded-lg shadow-md">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-gray-400 text-sm font-mono">http://localhost:5173/admin</div>
        <div></div>
      </div>

      <h1 className="text-3xl font-bold mb-6 text-white tracking-wide">Command Console</h1>
      
      <div className="bg-[#111111] border border-gray-700 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8)]">
        
        {/* Terminal Header */}
        <div className="bg-[#1a1a1a] px-4 py-2 border-b border-gray-700 flex items-center">
          <span className="text-gray-400 text-sm font-mono">terminal ~ bash</span>
        </div>

        {/* Terminal Output */}
        <div className="h-96 p-4 font-mono text-sm text-green-400 overflow-y-auto bg-black">
          {output.map((line, i) => (
            <div key={i} className="mb-1">{line}</div>
          ))}
        </div>

        {/* Command Input Area */}
        <form onSubmit={handleCommandSubmit} className="p-4 bg-[#1a1a1a] border-t border-gray-700 flex items-center gap-4">
          <span className="text-[#FF5A06] font-bold font-mono">$</span>
          <input 
            type="text" 
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            placeholder="Enter command..."
            className="flex-1 bg-transparent border-none outline-none text-white font-mono placeholder-gray-600 focus:ring-0"
          />
          <button 
            type="submit"
            className="px-6 py-2 bg-[#FF5A06] hover:bg-[#eb4f00] text-white font-bold rounded transition-colors shadow-lg shadow-[#FF5A06]/20"
          >
            Run
          </button>
        </form>

      </div>
    </div>
  );
}
