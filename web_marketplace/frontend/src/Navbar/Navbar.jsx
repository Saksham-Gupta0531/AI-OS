import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="text-white w-full h-[12vh] flex font-sans fixed">
            
            <div className="part-I w-[20%] h-full flex justify-end items-center text-3xl font-medium tracking-tight">
                <Link to="/">AI OS</Link>
            </div>
            
            <div className="part-II w-[60%] h-full flex justify-center items-center">
                <ul className="flex gap-10 text-md text-[#AFAFAF] font-medium">
                    <li className="hover:text-white cursor-pointer transition-colors duration-200"><Link to="/">Agents</Link></li>
                    <li className="hover:text-white cursor-pointer transition-colors duration-200"><Link to="/packages">Packages</Link></li>
                    <li className="hover:text-white cursor-pointer transition-colors duration-200"><Link to="/documents">Documents</Link></li>
                    <li className="hover:text-white cursor-pointer transition-colors duration-200"><Link to="/contact">Contact</Link></li>
                </ul>
            </div>
            
            <div className="part-III w-[20%] h-full flex items-center">
                <button 
                    className="bg-[#FF5A06] text-white font-semibold text-sm px-8 py-3.5 
                               rounded-tr-3xl rounded-bl-3xl 
                               hover:bg-[#eb4f00] 
                               transition-all duration-300 ease-in-out
                               hover:shadow-[0_4px_20px_rgba(255,90,6,0.4)] 
                               hover:-translate-y-0.5 active:translate-y-0"
                >
                    Downloads
                </button>
            </div>
            
        </nav>
    );
}

export default Navbar;