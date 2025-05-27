"use client";

import React, { useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
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

const Toolbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-[#2A2AA5] text-white flex flex-col gap-2 pb-5 relative">
      {/* Top Contact Bar */}
      <div className="flex flex-col sm:flex-row justify-end items-center px-4 sm:px-6 py-2 text-sm gap-5">
        <p className="text-center sm:text-left mb-1 sm:mb-0 text-white">
          <a href="mailto:info@aryaservice.com" className="hover:underline">
            info@aryaservice.com
          </a>{" "}
          |{" "}
          <a href="tel:+918928300744" className="hover:underline">
            +91 8928300744
          </a>
        </p>
        <div className="flex gap-3">
          <a href="#" aria-label="Twitter">
            <FaTwitter className="hover:text-gray-300" />
          </a>
          <a href="#" aria-label="Facebook">
            <FaFacebookF className="hover:text-gray-300" />
          </a>
          <a href="#" aria-label="Instagram">
            <FaInstagram className="hover:text-gray-300" />
          </a>
          <a href="#" aria-label="LinkedIn">
            <FaLinkedinIn className="hover:text-gray-300" />
          </a>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-white text-black w-[90%] mx-auto rounded-full px-4 sm:px-6 py-4 shadow-md relative z-50">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Arya Services</h1>

          {/* Toggle Menu Button for Mobile */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden text-2xl focus:outline-none"
            aria-label="Open menu"
          >
            <FaBars />
          </button>

          {/* Desktop Menu */}
          <ul className="hidden md:flex flex-wrap justify-center md:justify-start gap-4 text-sm font-semibold">
            {menuItems.map(({ name, icon, href, active }) => (
              <li key={name}>
                <a
                  href={href}
                  className={`flex items-center gap-1 px-2 py-1 rounded-md ${
                    active
                      ? "text-blue-700 border-b-2 border-blue-700"
                      : "hover:text-blue-600"
                  }`}
                >
                  {icon}
                  <span>{name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Slide-In Menu (Right to Left) */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Slide-In Panel */}
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
                          ? "text-blue-700 bg-blue-100"
                          : "hover:text-blue-600 hover:bg-gray-100"
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
    </header>
  );
};

export default Toolbar;
