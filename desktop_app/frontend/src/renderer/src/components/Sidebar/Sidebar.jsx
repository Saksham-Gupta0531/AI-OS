import { useState } from 'react';
import { Menu, SquarePen, Search, Bot, Settings, Zap, User } from 'lucide-react';
import './Sidebar.css';

function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className={`sidebar-wrap ${collapsed ? 'collapsed' : ''}`}>

            <div className="border-top" />
            <div className="border-bottom" />
            <div className="border-right" />

            <div className="sidebar-content">

                <div className="sidebar-header">
                    {!collapsed && (
                        <div className="sidebar-logo">
                            <Zap className="logo-icon" />
                            <span className="logo-text">AI<span className="logo-accent">.OS</span></span>
                        </div>
                    )}
                    <button className="menu-btn" onClick={() => setCollapsed(!collapsed)}>
                        <Menu />
                    </button>
                </div>

                <div className="sidebar-divider" />

                <nav className="nav-list">
                    <div className="nav-item" title="New Chat">
                        <SquarePen className="nav-icon" />
                        {!collapsed && <span>New Chat</span>}
                    </div>
                    <div className="nav-item" title="Search Chats">
                        <Search className="nav-icon" />
                        {!collapsed && <span>Search Chats</span>}
                    </div>
                    <div className="nav-item" title="Agents">
                        <Bot className="nav-icon" />
                        {!collapsed && <span>Agents</span>}
                    </div>
                </nav>

                <div className="sidebar-bottom">
                    <div className="sidebar-divider" />
                    <div className="nav-item " title="Settings">
                        <User className="nav-icon" />
                        {!collapsed && <span>Siddharth</span>}
                    </div>
                    <div className="nav-item settings-item" title="Settings">
                        <Settings className="nav-icon" />
                        {!collapsed && <span>Settings & Help</span>}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Sidebar;