"use client";

import React, { useState } from "react";
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
  { name: "About", icon: <FaInfoCircle />, href: "#" },
  { name: "Services", icon: <FaServicestack />, href: "#" },
  { name: "App", icon: <FaMobileAlt />, href: "#" },
  { name: "Client Say", icon: <FaQuoteRight />, href: "#" },
  { name: "Contact", icon: <FaEnvelope />, href: "#" },
];

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-white flex flex-col gap-2 py-5 sticky top-0 z-50 bg-transparent"
    >
      <motion.nav
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="bg-white/30 backdrop-blur-md text-white w-[95%] lg:w-[90%] mx-auto rounded-full px-4 sm:px-6 py-4 shadow-md border border-white/20"
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
                      : "hover:text-[#1b2657] text-[#111c4d] "
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

      {/* Mobile Slide Menu */}
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
    </motion.header>
  );
};

export default Navbar;
