import bgVideo from '../media/credia2.mp4';
import phoneBg from '../media/phone_poster.png';
import NewBg from '../media/NewBg.webp';
import AgentSpline from '../Agent3D/AgentSpline';

function Home() {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <img
        src={NewBg}
        alt="Background"
        className="w-full h-full object-contain"
      />

      {/* <video
        className="col-start-1 row-start-1 h-full w-full object-cover hidden md:block"
        src={bgVideo}
        autoPlay
        loop
        muted
        playsInline
      /> */}

      {/* <AgentSpline /> */}
    </div>
  );
}

export default Home;
