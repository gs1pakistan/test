import React from 'react';

const VideoBackground = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      >
        <source src="/videos/cyber-background.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoBackground;
