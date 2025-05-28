"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  FaHome,
  FaInfoCircle,
  FaServicestack,
  FaEnvelope,
  FaBars,
  FaTimes,
  FaSignInAlt,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  { name: "Home", icon: <FaHome />, href: "/" },
  { name: "About", icon: <FaInfoCircle />, href: "/about-us" },
  { name: "Services", icon: <FaServicestack />, href: "/services" },
  { name: "Contact", icon: <FaEnvelope />, href: "/contact" },
];

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // ❗ Disable scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Clean up on unmount
    return () => document.body.classList.remove("overflow-hidden");
  }, [menuOpen]);

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-white flex flex-col gap-2 sticky top-0 z-50 bg-transparent"
    >
      <motion.nav
        role="navigation"
        aria-label="Main navigation"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="w-[95%] lg:w-[90%] mx-auto px-4 sm:px-6 py-4 bg-white shadow-xl rounded-b-2xl"
      >
        <div className="flex justify-between items-center">
          <h1
            className="text-xl font-bold text-[#112588] cursor-pointer"
            onClick={() => router.push("/")}
          >
            Arya Services
          </h1>

          <div className="hidden md:flex gap-4 items-center">
            <ul className="flex gap-4 text-sm font-semibold">
              {menuItems.map(({ name, icon, href }) => (
                <li key={name}>
                  <a
                    href={href}
                    className={`flex items-center gap-1 px-2 py-1 rounded-md ${
                      pathname === href
                        ? "text-[#112688] border-b-2 border-[#112688]"
                        : "hover:text-[#1b2657] text-[#111c4d]"
                    }`}
                  >
                    {icon}
                    <span>{name}</span>
                  </a>
                </li>
              ))}
            </ul>
            <button
              onClick={handleLogin}
              className="bg-[#2f4097] hover:bg-[#21307d] text-white text-sm px-4 py-2 rounded-full flex items-center gap-2"
            >
              <FaSignInAlt />
              Login
            </button>
          </div>

          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden text-2xl focus:outline-none text-[#112588]"
            aria-label="Open menu"
          >
            <FaBars />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
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
              className="fixed top-0 right-0 h-full w-72 bg-white text-black z-50 p-6 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Menu</h2>
                <FaTimes
                  className="text-2xl cursor-pointer"
                  onClick={() => setMenuOpen(false)}
                />
              </div>
              <ul className="flex flex-col gap-4 text-sm font-semibold">
                {menuItems.map(({ name, icon, href }) => (
                  <li key={name}>
                    <a
                      href={href}
                      className={`flex items-center gap-2 px-2 py-2 rounded-md ${
                        pathname === href
                          ? "text-[#112688] bg-blue-100"
                          : "hover:text-[#1b2657] hover:bg-gray-100"
                      }`}
                    >
                      {icon}
                      {name}
                    </a>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      router.push("/login");
                    }}
                    className="w-full flex items-center gap-2 px-2 py-2 rounded-md text-[#112688] hover:bg-gray-100"
                  >
                    <FaSignInAlt />
                    Login
                  </button>
                </li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
