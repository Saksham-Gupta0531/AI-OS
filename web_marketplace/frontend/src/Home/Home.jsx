import NewBg from '../media/NewBg.png';
import Navbar from '../Navbar/Navbar';
import Caption from './Caption';

function Home() {
  return (
    <div className="text-white min-h-screen w-full bg-cover bg-center bg-no-repeat flex flex-col"  style={{ backgroundImage: `url(${NewBg})` }}  >
      <Navbar />
      <Caption />
    </div>
  );
}

export default Home;