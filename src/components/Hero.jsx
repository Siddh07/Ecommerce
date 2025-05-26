import React from 'react';

const Hero = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col sm:flex-row border border-gray-400 rounded-lg overflow-hidden shadow-lg">
        
        {/* Left Side */}
        <div className="w-full sm:w-1/2 flex flex-col justify-center items-center sm:items-start p-8 bg-white">
          <div className="text-[#414141] max-w-md">
            {/* Small line and label */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-[2px] bg-[#414141]"></div>
              <p className="uppercase text-xs tracking-widest font-semibold">OUR BEST SELLERS</p>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              NEW ARRIVALS
            </h1>

            {/* Shop Now */}
            <div className="flex items-center gap-4">
              <button className="font-semibold text-sm md:text-base text-white bg-[#414141] px-6 py-2 rounded hover:bg-gray-700 transition">
                SHOP NOW
              </button>
              <div className="w-16 h-[1px] bg-[#414141]"></div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full sm:w-1/2">
          <img
            className="w-full h-full object-cover"
            src="https://via.placeholder.com/600x400"
            alt="Hero"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
