"use client";

import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { MdMenu } from "react-icons/md";
import { HiUserCircle } from "react-icons/hi";
import { useTheme } from "@/context/ThemeContext";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { cookies } from "next/headers";
import { Constants } from "@/constant/constant";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    const updateBodyScroll = () => {
      if (isSidebarOpen && window.innerWidth < 1024) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    };

    updateBodyScroll();
    window.addEventListener("resize", updateBodyScroll);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("resize", updateBodyScroll);
    };
  }, [isSidebarOpen]);

  const handleLogout = () => {
    localStorage.clear();
    Cookies.remove("token"); // Replace with your auth cookie name if different
    router.push("/login"); // Redirect to login page
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className={`${isSidebarOpen ? "block" : "hidden"} lg:block`}>
        <Sidebar onThemeToggle={toggleTheme} currentTheme={theme} />
      </div>

      <main className="flex-1 min-w-0 lg:pl-64">
        {/* Header */}
        <div className="h-16 bg-[var(--header-bg)] flex items-center justify-between px-6 fixed top-0 right-0 left-0 lg:left-64 z-30 shadow-lg backdrop-blur-md border-b border-gray-200 dark:border-gray-800/50">
          <div className="flex items-center gap-2">
            <button
              className="lg:hidden hover:bg-[var(--sidebar-hover)] rounded-lg p-1 transition-colors"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <MdMenu className="w-6 h-6 text-[var(--header-text)]" />
            </button>
            <span className="text-xl font-semibold text-[var(--header-text)]">
              {Constants.DEFAULT_BRAND_NAME} Services
            </span>
          </div>

          <div className="relative flex items-center gap-4">
            <span className="text-[var(--header-text)]">Welcome, Admin</span>
            <div
              onClick={() => setShowUserMenu((prev) => !prev)}
              className="w-10 h-10 bg-[var(--sidebar-hover)] rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-800/50 hover:bg-[var(--sidebar-active)] transition-colors cursor-pointer"
            >
              <HiUserCircle className="w-6 h-6 text-[var(--header-text)]" />
            </div>

            {/* Dropdown */}
            {showUserMenu && (
              <div className="absolute top-14 right-0 bg-white text-black rounded-lg shadow-lg w-40 z-50 py-2">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Page content */}
        <div className="pt-16 min-h-screen">
          <div className="p-6 space-y-6">{children}</div>
        </div>
      </main>
    </div>
  );
}
