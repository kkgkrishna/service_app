"use client";

import React from "react";
import Image from "next/image";
import { FaDownload, FaThumbsUp, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import CountUp from "react-countup";

const stats = [
  {
    icon: <FaDownload className="text-white text-2xl" />,
    value: "59865",
    label: "5 STAR RATING",
  },
  {
    icon: <FaThumbsUp className="text-white text-2xl" />,
    value: "29852",
    label: "LIKE",
  },
  {
    icon: <FaStar className="text-white text-2xl" />,
    value: "1500",
    label: "DOWNLOAD",
  },
];

const DownloadAppSection: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-white text-center">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
        {/* Left Content */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="lg:w-1/2 space-y-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e1e50] text-left">
            DOWNLOAD APP NOW
          </h2>
          <p className="text-gray-600 max-w-lg mx-auto lg:mx-0">
            Download the app, setup your account in few clicks and you can use
            the variety Repair & Maintenance services offered at your doorstep
          </p>
          {/* App Store Buttons */}
          <div className="flex justify-center lg:justify-start gap-4">
            <Image
              src="/assets/DownloadAppSection/playStore.png"
              alt="Google Play"
              width={140}
              height={50}
            />
            <Image
              src="/assets/DownloadAppSection/appStore.png"
              alt="App Store"
              width={140}
              height={50}
            />
          </div>
          {/* Stats */}
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-8">
            {stats.map((item, index) => (
              <div
                key={index}
                className="bg-[#1f2aa5] text-white px-6 py-6 rounded-2xl min-w-[150px] flex flex-col items-center"
              >
                {item.icon}
                <div className="text-2xl font-bold mt-2">
                  <CountUp end={parseInt(item.value)} duration={5} />
                </div>
                <p className="text-sm mt-1 text-gray-200">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="lg:w-1/2 flex flex-col lg:flex-row items-center justify-center gap-5"
        >
          <Image
            src="/assets/DownloadAppSection/img1.png"
            alt="App Preview"
            width={500}
            height={500}
            className="rounded-3xl shadow-xl max-w-[90%] lg:max-w-[500px]"
          />{" "}
          <Image
            src="/assets/DownloadAppSection/img2.png"
            alt="App Preview"
            width={500}
            height={500}
            className="rounded-3xl shadow-xl max-w-[90%] lg:max-w-[500px] "
          />
        </motion.div>
      </div>
    </section>
  );
};

export default DownloadAppSection;
