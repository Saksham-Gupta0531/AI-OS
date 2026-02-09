import bgVideo from '../media/credia2.mp4';
import phoneBg from '../media/phone_poster.png';
import AgentSpline from '../Agent3D/AgentSpline';

function Home() {
  return (
    <div className="relative grid h-screen w-full overflow-x-hidden">
      <img
        src={phoneBg}
        alt="Phone Background"
        className="col-start-1 row-start-1 h-full w-full object-cover md:hidden"
      />

      <video
        className="col-start-1 row-start-1 h-full w-full object-cover hidden md:block"
        src={bgVideo}
        autoPlay
        loop
        muted
        playsInline
      />

      <AgentSpline />
    </div>
  );
}

export default Home;
