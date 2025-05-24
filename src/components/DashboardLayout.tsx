"use client";

import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { MdMenu } from "react-icons/md";
import { useTheme } from "@/context/ThemeContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { theme, toggleTheme } = useTheme();

  // Handle mobile menu
  useEffect(() => {
    if (isSidebarOpen && window.innerWidth < 1024) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSidebarOpen]);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Mobile menu overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`${isSidebarOpen ? "block" : "hidden"} lg:block`}>
        <Sidebar onThemeToggle={toggleTheme} currentTheme={theme} />
      </div>

      {/* Main Content */}
      <main className="flex-1 min-w-0 lg:pl-64">
        {/* Header */}
        <div className="h-16 bg-[var(--header-bg)] flex items-center justify-between px-6 fixed top-0 right-0 left-0 lg:left-64 z-30 shadow-lg backdrop-blur-md border-b border-gray-200 dark:border-gray-800/50 transition-colors duration-200">
          <div className="flex items-center gap-2">
            <button
              className="lg:hidden hover:bg-[var(--sidebar-hover)] rounded-lg p-1 transition-colors"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <MdMenu className="w-6 h-6 text-[var(--header-text)]" />
            </button>
            <span className="text-xl font-semibold text-[var(--header-text)]">
              Arya Services
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[var(--header-text)]">Welcome, Admin</span>
            <div className="w-10 h-10 bg-[var(--sidebar-hover)] rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-800/50 hover:bg-[var(--sidebar-active)] transition-colors">
              <svg
                className="w-6 h-6 text-[var(--header-text)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="pt-16 min-h-screen">
          <div className="p-6 space-y-6">{children}</div>
        </div>
      </main>
    </div>
  );
}
