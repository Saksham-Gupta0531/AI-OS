import { Menu, SquarePen, Search, Bot } from 'lucide-react';
import './Sidebar.css';

function Sidebar() {
    return (
        <div className="sidebar-wrap ml-5 w-full h-full border-r-1 text-[#E1E4EA] border-[#717783] rounded-sm">
            <div className="sidebar-content w-full h-full">
                <div className="w-full h-[6%] logo flex gap-30 justify-around items-center">
                    <div></div>
                    <div className="menu-btn"><Menu /></div>
                </div>

                <div className="items h-[15%] flex flex-col justify-center gap-5 text-sm mt-10">
                    <div className="nav-item"><SquarePen className="w-5 h-5" />New chat</div>
                    <div className="nav-item"><Search className="w-5 h-5" />Search chats</div>
                    <div className="nav-item"><Bot className="w-5 h-5" />Agents</div>
                </div>

            </div>
        </div>
    );
}

export default Sidebar;