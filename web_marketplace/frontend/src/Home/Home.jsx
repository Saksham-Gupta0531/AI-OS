import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import NewBg from '../media/NewBg.png';
import Navbar from '../Navbar/Navbar';
import Caption from './Caption';
import Services from './Services';

function Home() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="fixed top-0 left-0 w-full z-[100]">
        <Navbar />
      </div>

      <div className="sticky top-0 h-screen w-full -z-10 overflow-hidden bg-[#050505]">

        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-10"
          style={{
            backgroundImage: `url(${NewBg})`,
            scale: scale,     
            opacity: opacity  
          }}
        />

        <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-black to-transparent opacity-90 -z-10" />

        <div className="relative z-10 w-full flex flex-col pt-20">
            <Caption />
        </div>

      </div>

      <div className="relative z-10">
        <div className="shadow-[0_-40px_80px_rgba(0,0,0,0.95)] overflow-hidden">
          <Services />
        </div>
      </div>

    </div>
  );
}

export default Home;