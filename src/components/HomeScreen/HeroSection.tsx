"use client";

import React from "react";
import Image from "next/image";

const HeroSection: React.FC = () => {
  return (
    <section className="bg-[#2A2AA5] text-white overflow-hidden">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between px-4 md:px-8 py-12 lg:py-20 max-w-7xl mx-auto gap-12">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 bg-white text-black p-6 md:p-10 rounded-lg shadow-lg z-10 text-center lg:text-left">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-snug">
            A GREAT APP MAKES YOUR LIFE BETTER
          </h2>
          <p className="text-sm md:text-base text-gray-700 mb-6">
            One stop shop for all Servicing, Repair, Installations that you will
            need, with easy setup & faster services that will save you time and
            money at your doorstep
          </p>
          <p className="font-semibold mb-4">Download App Now</p>
          <div className="flex justify-center lg:justify-start gap-4">
            <Image
              src="/google-play-badge.png"
              alt="Google Play"
              width={130}
              height={40}
            />
            <Image
              src="/app-store-badge.png"
              alt="App Store"
              width={130}
              height={40}
            />
          </div>
        </div>

        {/* Right Content */}
        <div className="relative w-full lg:w-1/2 flex justify-center">
          <div className="relative w-[250px] sm:w-[300px] md:w-[350px] lg:w-[400px]">
            <Image
              src="/phone-ui-mockup.png"
              alt="App UI"
              width={400}
              height={800}
              className="w-full"
            />
            {/* Floating Badges */}
            <div className="absolute top-4 -left-6 bg-white text-blue-700 text-xs md:text-sm font-semibold px-3 py-1 rounded-full shadow">
              Easy to use
            </div>
            <div className="absolute top-24 -right-6 bg-white text-blue-700 text-xs md:text-sm font-semibold px-3 py-1 rounded-full shadow">
              An interesting UI
            </div>
            <div className="absolute -bottom-6 right-0 bg-white text-center px-4 py-2 rounded-xl shadow-lg">
              <p className="text-xs text-gray-500">User Download</p>
              <p className="text-lg md:text-xl text-blue-800 font-bold">
                50,000
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
