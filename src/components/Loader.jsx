import React from 'react';

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-xs tracking-widest uppercase text-black">Loading Porsche...</p>
    </div>
  );
};

export default Loader;
