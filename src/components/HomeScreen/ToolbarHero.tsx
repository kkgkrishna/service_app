"use client";

import "./ToolbarHero.css";
import React, { useState } from "react";
import Image from "next/image";
import {
  FaHome,
  FaInfoCircle,
  FaServicestack,
  FaMobileAlt,
  FaQuoteRight,
  FaEnvelope,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  { name: "Home", icon: <FaHome />, href: "#", active: true },
  { name: "About", icon: <FaInfoCircle />, href: "#about" },
  { name: "Services", icon: <FaServicestack />, href: "#services" },
  { name: "App", icon: <FaMobileAlt />, href: "#app" },
  { name: "Client Say", icon: <FaQuoteRight />, href: "#clients" },
  { name: "Contact", icon: <FaEnvelope />, href: "#contact" },
];

const ToolbarHero: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section id="bg_image" className="relative pt-28">
      {/* Navbar Only */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 bg-transparent w-full "
        style={{ zIndex: 50 }}
      >
        <motion.nav
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white/30 backdrop-blur-md text-white w-[95%] lg:w-[90%] mx-auto mt-4 rounded-full px-4 sm:px-6 py-4 shadow-md border border-white/20"
        >
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-[#111c4d]">Arya Services</h1>
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden text-2xl focus:outline-none"
              aria-label="Open menu"
            >
              <FaBars />
            </button>
            <ul className="hidden md:flex flex-wrap justify-center md:justify-start gap-4 text-sm font-semibold">
              {menuItems.map(({ name, icon, href, active }) => (
                <li key={name}>
                  <a
                    href={href}
                    className={`flex items-center gap-1 px-2 py-1 rounded-md ${
                      active
                        ? "text-[#112688] border-b-2 border-[#112688]"
                        : "hover:text-[#1b2657] text-[#313639]"
                    }`}
                  >
                    {icon}
                    <span>{name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.nav>
      </motion.div>

      {/* Mobile Slide-In Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-72 bg-white text-black z-50 p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Menu</h2>
                <FaTimes
                  className="text-2xl cursor-pointer"
                  onClick={() => setMenuOpen(false)}
                />
              </div>
              <ul className="flex flex-col gap-4 text-sm font-semibold">
                {menuItems.map(({ name, icon, href, active }) => (
                  <li key={name}>
                    <a
                      href={href}
                      className={`flex items-center gap-2 px-2 py-2 rounded-md ${
                        active
                          ? "text-[#112688] bg-blue-100"
                          : "hover:text-[#1b2657] hover:bg-gray-100"
                      }`}
                    >
                      {icon}
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative text-white overflow-visible min-h-[85dvh]">
        <div className="relative z-10 flex flex-col-reverse lg:flex-row items-center justify-between px-4 lg:px-0 md:px-8 py-12 max-w-7xl mx-auto gap-12">
          {/* Left Content with Animation */}
          <motion.div
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full lg:w-1/2 bg-white text-black p-6 md:p-10 rounded-lg shadow-lg text-center lg:text-left lg:ms-5"
          >
            <motion.h2
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-2xl md:text-4xl font-bold mb-4 leading-snug text-[#313639]"
            >
              A GREAT APP MAKES YOUR LIFE BETTER
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-sm md:text-lg text-gray-700 mb-6"
            >
              One stop shop for all Servicing, Repair, Installations that you
              will need, with easy setup & faster services that will save you
              time and money at your doorstep
            </motion.p>
            <motion.p
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="font-semibold mb-4 text-2xl text-[#313639]"
            >
              Download App Now
            </motion.p>
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="flex justify-center lg:justify-start gap-4"
            >
              <Image
                src="/assets/DownloadAppSection/playStore.png"
                alt="Google Play"
                width={130}
                height={40}
              />
              <Image
                src="/assets/DownloadAppSection/appStore.png"
                alt="App Store"
                width={130}
                height={40}
              />
            </motion.div>
          </motion.div>

          {/* Right Content with Animation */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="relative w-full lg:w-1/2 flex justify-center"
          >
            <div className="relative w-[250px] sm:w-[300px] md:w-[350px] lg:w-auto">
              <Image
                src="/assets/HeroSection/mobile.png"
                alt="App UI"
                height={500}
                width={500}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </motion.div>
        </div>
      </section>
    </section>
  );
};

export default ToolbarHero;
