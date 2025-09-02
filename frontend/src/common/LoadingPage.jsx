import React from 'react';

const LoadingPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center">
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
          <div className="absolute w-12 h-12 border-4 border-t-4 border-gray-200 border-t-green-500 rounded-full animate-spin animate-reverse"></div>
        </div>
        <h2 className="mt-4 text-2xl font-semibold text-gray-700 animate-pulse">
          Loading Your Shopping Experience...
        </h2>
        <p className="mt-2 text-gray-500">Discover clothes, devices, furniture, and mobiles!</p>
      </div>
    </div>
  );
};

export default LoadingPage;