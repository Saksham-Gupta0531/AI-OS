import React from 'react';
import BackgroundVideo from '../components/BackgroundVideo';
import LoginCard from '../components/LoginCard';

const LoginPage = () => {
  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black font-sans">
      {/* Assuming the video is placed in your public folder */}
      <BackgroundVideo videoSrc="/baground.mp4" />
      <LoginCard />
    </div>
  );
};

export default LoginPage;