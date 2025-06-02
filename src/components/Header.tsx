"use client";

import { useState } from "react";
import { MdMenu } from "react-icons/md";
import Cookies from "js-cookie";
import Image from "next/image";
import { HiUserCircle } from "react-icons/hi";
import { Constants } from "@/constant/constant";
interface HeaderProps {
  onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    Cookies.remove("token"); // Replace with your cookie name(s)
    window.location.href = "/login"; // Redirect to login
  };

  const user = {
    name: "Admin User",
    email: "admin@clapzo.com",
    image: "/avatar.png", // Make sure this exists or use a placeholder
  };

  alert(showDropdown);

  return (
    <div className="h-16 bg-[var(--gradient-header)] backdrop-blur-md bg-opacity-90 flex items-center justify-between px-6 text-white shadow-lg z-50 relative">
      <div className="flex items-center gap-2">
        {onMenuClick && (
          <button
            className="lg:hidden hover:bg-white/10 rounded-lg p-1 transition-colors"
            onClick={onMenuClick}
          >
            <MdMenu className="w-6 h-6" />
          </button>
        )}
        <span className="text-xl font-semibold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
          {Constants.DEFAULT_BRAND_NAME} Services
        </span>
      </div>

      <div className="flex items-center gap-4 relative">
        <span className="text-white/90">Welcome, Admin</span>

        {/* Profile Icon */}
        <div
          onClick={() => setShowDropdown((prev) => !prev)}
          className="w-10 h-10 cursor-pointer bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 hover:border-white/20 transition-colors shadow-inner bg-red-300"
        >
          <HiUserCircle className="w-6 h-6 text-white/90" />
        </div>

        {/* Dropdown */}
        {showDropdown && (
          <div className="absolute top-14 right-0 bg-white text-black rounded-xl shadow-lg w-64 z-50 p-4">
            <div className="flex items-center gap-4 border-b pb-4">
              <Image
                src={user.image}
                alt="User"
                width={48}
                height={48}
                className="rounded-full border"
              />
              <div>
                <p className="font-semibold text-base">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full mt-4 text-sm bg-[#1f2aa5] hover:bg-[#1a238e] text-white py-2 px-4 rounded-full font-semibold transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
