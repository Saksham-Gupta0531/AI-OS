import bgImg from '../../media/bgImg.png';
import Sidebar from '../Sidebar/Sidebar';
import Result from '../Result/Result';
import Prompt from '../Prompt/Prompt';

function Home() {
    return (
        <div className="w-screen h-screen flex overflow-hidden text-white bg-cover bg-bottom" style={{ backgroundImage: `url(${bgImg})` }}>
            <div className="h-full flex-shrink-0" style={{ width: '16%' }}>
                <Sidebar />
            </div>

            <div className="flex flex-col overflow-hidden" style={{ width: '84%', height: '100%' }}>
                
                <div className="flex-1 overflow-hidden w-full h-full">
                    <Result />
                </div>

            </div>

        </div>
    );
}

export default Home;