"use client";

import React, { useState } from "react";
import { MdMenu, MdLogout, MdPerson, MdClose } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { Constants } from "@/constant/constant";
import { useAuth } from "@/context/AuthContext";

function EngineerToolbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const { logout } = useAuth();

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      {/* Toolbar */}
      <div className="flex justify-between items-center px-4 py-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <h1 className="text-lg font-bold text-gray-900 dark:text-white">
          {Constants?.DEFAULT_BRAND_NAME} Services
        </h1>
        <button
          className="text-2xl text-gray-700 dark:text-white focus:outline-none"
          onClick={() => setIsOpen(true)}
        >
          <MdMenu />
        </button>
      </div>

      {/* Bottom Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: "50%" }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-x-0 bottom-0 h-1/2 bg-white dark:bg-gray-900 rounded-t-2xl shadow-2xl border-t border-gray-200 dark:border-gray-700 p-5 z-50"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Menu
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-2xl text-gray-600 dark:text-gray-400 hover:text-red-500"
              >
                <MdClose />
              </button>
            </div>

            <ul className="space-y-4">
              <li className="flex items-center justify-between text-gray-800 dark:text-gray-200">
                <div className="flex items-center gap-2">
                  <MdPerson className="text-xl" />
                  Status:
                </div>
                <button
                  onClick={() => setIsOnline((prev) => !prev)}
                  className={`px-3 py-1 text-sm rounded-full font-semibold ${
                    isOnline
                      ? "bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-300"
                      : "bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-300"
                  }`}
                >
                  {isOnline ? "Online" : "Offline"}
                </button>
              </li>

              <li
                className="flex items-center gap-2 text-red-600 cursor-pointer hover:underline"
                onClick={() => logout()}
              >
                <MdLogout className="text-xl" />
                Logout
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default EngineerToolbar;
