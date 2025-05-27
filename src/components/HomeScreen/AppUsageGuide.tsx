"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const AppUsageGuide: React.FC = () => {
  return (
    <>
      {/* Section: How to Use App */}
      <section className="bg-[#2A2AA5] text-white px-4 py-16 text-center relative z-10 overflow-hidden">
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

      {/* Section: Contact + Form */}
      <section className="bg-white px-6 py-20 text-black relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row rounded-3xl shadow-xl overflow-hidden bg-white">
          {/* Contact Info */}
          <div className="w-full lg:w-1/2 p-8 md:p-12 space-y-6">
            <h3 className="text-2xl font-bold mb-4">CONTACT US</h3>

            <div className="flex items-center gap-4">
              <div className="bg-[#1f2aa5] p-3 rounded-full text-white text-xl">
                <FaEnvelope />
              </div>
              <p className="text-gray-700 font-medium">info@aryaservice.com</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-[#1f2aa5] p-3 rounded-full text-white text-xl">
                <FaPhoneAlt />
              </div>
              <p className="text-gray-700 font-medium">+91 8928300744</p>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-[#1f2aa5] p-3 rounded-full text-white text-xl">
                <FaMapMarkerAlt />
              </div>
              <p className="text-gray-700 font-medium">
                MIG 110 Siddhart Inclave Vistar
                <br />
                Taramandal, Gorakhpur
                <br />
                Uttar Pradesh 273010
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="w-full lg:w-1/2 p-8 md:p-12 border-t lg:border-t-0 lg:border-l border-gray-200 shadow-lg">
            <h3 className="text-2xl font-bold mb-6">GET IT TOUCH</h3>

            <form className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Your fullname"
                  className="w-full rounded-full border border-gray-300 px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="tel"
                  placeholder="Phone number"
                  className="w-full rounded-full border border-gray-300 px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full rounded-full border border-gray-300 px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Message"
                rows={4}
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-[#1f2aa5] hover:bg-[#1a238e] text-white px-8 py-3 rounded-full font-semibold text-sm"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AppUsageGuide;
