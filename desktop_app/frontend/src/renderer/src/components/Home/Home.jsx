import bgImg from '../../media/bgImg.png';
import Sidebar from '../Sidebar/Sidebar';
import Result from '../Result/Result';
import Prompt from '../Prompt/Prompt';

function Home() {
    return (
        <div className="w-screen h-screen flex overflow-hidden text-white bg-cover bg-bottom" style={{ backgroundImage: `url(${bgImg})` }}>
            
            {/* Sidebar */}
            <div className="h-full flex-shrink-0" style={{ width: '16%' }}>
                <Sidebar />
            </div>

            {/* Main area — flex column, fixed height */}
            <div className="flex flex-col overflow-hidden" style={{ width: '84%', height: '100%' }}>
                
                {/* Result — takes all remaining space above prompt */}
                <div className="flex-1 overflow-hidden">
                    <Result />
                </div>

                {/* Prompt — fixed to its natural height, never grows downward */}
                <div className="flex-shrink-0 relative">
                    <Prompt />
                </div>

            </div>

        </div>
    );
}

export default Home;