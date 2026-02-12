function Caption() {
    return (
        <div className="h-[30vh] w-full flex justify-center font-sans">
            <div className="relative w-full max-w-2xl flex flex-col items-center justify-center py-10">
                <div className="absolute top-3 left-0 w-6 h-6 border-t-[1.5px] border-l-[1.5px] border-white"></div>          
                <h2 className="text-5xl md:text-4xl font-bold text-white tracking-tight mb-6 text-center">
                    Evolution of the Operating System
                </h2>
                
                <p className="text-[#AFAFAF] text-md font-medium leading-relaxed text-center max-w-2xl">
                    Redefine computing with autonomous agents<br className="hidden md:block" />
                     that learn and manage your environment.
                </p>

                <div className="absolute bottom-3 right-0 w-6 h-6 border-b-[1.5px] border-r-[1.5px] border-white/70"></div>
                
            </div> 
            
        </div>
    );
}

export default Caption;