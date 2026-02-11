function Navbar() {
    return (
        <nav className="text-white w-full h-[12vh] flex font-sans">
            
            <div className="part-I w-[20%] h-full flex justify-end items-center text-3xl font-medium tracking-tight">
                AI OS
            </div>
            
            <div className="part-II w-[60%] h-full flex justify-center items-center">
                <ul className="flex gap-10 text-md text-[#AFAFAF] font-medium">
                    <li className="hover:text-white cursor-pointer transition-colors duration-200">Home</li>
                    <li className="hover:text-white cursor-pointer transition-colors duration-200">Packages</li>
                    <li className="hover:text-white cursor-pointer transition-colors duration-200">Documents</li>
                    <li className="hover:text-white cursor-pointer transition-colors duration-200">Contact</li>
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