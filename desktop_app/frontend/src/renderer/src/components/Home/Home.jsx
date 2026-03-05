import bgImg from '../../media/bgImg.png';
import Sidebar from '../Sidebar/Sidebar';

function Home() {
    return (
        <div className="w-screen h-screen overflow-hidden text-white bg-cover bg-bottom" style={{ backgroundImage: `url(${bgImg})` }}>
            <div className="w-[16%] h-full sidebar">
                <Sidebar />
            </div>
        </div>
    )
}

export default Home;