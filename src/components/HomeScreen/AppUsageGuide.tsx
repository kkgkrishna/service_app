"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const AppUsageGuide: React.FC = () => {
  return (
    <section className="bg-[#2A2AA5] text-white px-4 py-16 text-center relative -z-10 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
          HOW TO USE THE APP PERFECTLY
        </h2>
        <p className="text-sm md:text-lg leading-relaxed text-white/90">
          Download the app, enter your contact details with address & update
          your profile with all the Electrical appliances available in your
          house. Once all the details are updated, booking a complaint will be
          just a few clicks away
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="max-w-3xl mx-auto mt-12 overflow-hidden rounded-[30px] shadow-lg"
      >
        <Image
          src="/assets/AppUsageGuide/appUsage.jpg"
          alt="How to Use App"
          width={900}
          height={500}
          className="w-full object-cover"
        />
      </motion.div>
    </section>
  );
};

export default AppUsageGuide;
