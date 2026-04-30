import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div className="relative min-h-screen w-full bg-[#050505] text-white flex overflow-hidden font-sans">
      
      {/* Sidebar matching Siddharth's screenshot */}
      <aside className="w-64 flex-shrink-0 bg-[#0a0a0a] border-r border-gray-800 flex flex-col h-screen fixed">
        <div className="p-6">
          <h2 className="text-2xl font-bold tracking-wider mb-2">AI-OS</h2>
          <div className="text-[#FF5A06] text-xs font-semibold tracking-widest uppercase">Admin Panel</div>
        </div>

        <nav className="flex-1 mt-6">
          <ul className="space-y-2 px-4">
            <li>
              <NavLink 
                to="/admin" 
                end
                className={({ isActive }) => 
                  `block px-4 py-3 rounded-md transition-colors ${isActive ? 'bg-[#FF5A06]/20 text-[#FF5A06] border border-[#FF5A06]/30' : 'text-gray-400 hover:text-white hover:bg-gray-900'}`
                }
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/admin/agents" 
                className={({ isActive }) => 
                  `block px-4 py-3 rounded-md transition-colors ${isActive ? 'bg-[#FF5A06]/20 text-[#FF5A06] border border-[#FF5A06]/30' : 'text-gray-400 hover:text-white hover:bg-gray-900'}`
                }
              >
                Agents
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/admin/logs" 
                className={({ isActive }) => 
                  `block px-4 py-3 rounded-md transition-colors ${isActive ? 'bg-[#FF5A06]/20 text-[#FF5A06] border border-[#FF5A06]/30' : 'text-gray-400 hover:text-white hover:bg-gray-900'}`
                }
              >
                Logs
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/admin/security" 
                className={({ isActive }) => 
                  `block px-4 py-3 rounded-md transition-colors ${isActive ? 'bg-[#FF5A06]/20 text-[#FF5A06] border border-[#FF5A06]/30' : 'text-gray-400 hover:text-white hover:bg-gray-900'}`
                }
              >
                Security
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <NavLink to="/">
            <button className="w-full text-left px-4 py-2 text-sm text-gray-500 hover:text-white transition-colors">
              &larr; Exit Admin
            </button>
          </NavLink>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 p-8 min-h-screen overflow-y-auto">
        <Outlet />
      </main>

    </div>
  );
}
