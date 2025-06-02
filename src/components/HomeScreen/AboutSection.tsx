"use client";

import React from "react";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { Constants } from "@/constant/constant";

const features = [
  {
    title: "Transparent Pricing",
    description: "See fixed prices before you book. No hidden charges.",
  },
  {
    title: "Experts Only",
    description:
      "Our professionals are well trained and have on-job expertise.",
  },
  {
    title: "Fully Equipped",
    description: "We bring everything needed to get the job done well.",
  },
];

const AboutSection: React.FC = () => {
  return (
    <section className="py-16 px-4 md:px-8 bg-white text-center">
      {/* Title */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <p className="text-sm uppercase font-semibold text-gray-600 tracking-widest">
          Why {Constants.DEFAULT_BRAND_NAME} ?
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-[#2f4097] mt-2">
          About Us
        </h2>
        <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
          {Constants.DEFAULT_BRAND_NAME} Services is a platform that offers its
          customers to book Services & Repair complaints for all the Electrical
          appliances at home with convenience & much more.
        </p>
      </motion.div>

      {/* Content Layout */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 max-w-6xl mx-auto">
        {/* Left Image */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full lg:w-1/2"
        >
          <Image
            src="/assets/AboutSection/technician2.jpg" // Update with your actual path
            alt="Technician servicing AC"
            width={600}
            height={400}
            className="rounded-3xl shadow-lg mx-auto "
          />
        </motion.div>

        {/* Right Features */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-col gap-6 w-full lg:w-1/2"
        >
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 p-5 bg-white shadow-md rounded-xl text-left"
            >
              <FaCheckCircle className="text-blue-600 text-xl mt-1" />
              <div>
                <h4 className="text-lg font-bold text-[#1e1e50]">
                  {feature.title.toUpperCase()}
                </h4>
                <p className="text-gray-600 text-sm mt-1">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
