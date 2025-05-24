"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  MdDashboard,
  MdMessage,
  MdPayments,
  MdPeople,
  MdPerson,
  MdLightMode,
  MdDarkMode,
} from "react-icons/md";
import { cn } from "@/lib/utils";

interface SidebarProps {
  onThemeToggle: () => void;
  currentTheme: string;
}

export default function Sidebar({ onThemeToggle, currentTheme }: SidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    {
      title: "Dashboard",
      icon: <MdDashboard className="w-6 h-6" />,
      path: "/dashboard",
    },
    {
      title: "Manage Inquiry",
      icon: <MdMessage className="w-6 h-6" />,
      path: "/inquiries",
    },
    {
      title: "Manage Collection",
      icon: <MdPayments className="w-6 h-6" />,
      path: "/dashboard/collections",
    },
    {
      title: "Manage Engineer",
      icon: <MdPeople className="w-6 h-6" />,
      path: "/engineers",
    },
    {
      title: "Manage Stock User",
      icon: <MdPerson className="w-6 h-6" />,
      path: "/stock-users",
    },
  ];

  return (
    <aside className="w-64 bg-[var(--sidebar-bg)] h-screen border-r border-gray-200 dark:border-gray-800/50 shadow-xl fixed top-0 left-0 transition-colors duration-200">
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-800/50 bg-[var(--header-bg)]">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="Admin Dashboard"
            width={40}
            height={40}
            className="h-10 w-10"
          />
          <span className="text-xl font-semibold text-[var(--header-text)]">
            Admin
          </span>
        </div>
        <button
          onClick={onThemeToggle}
          className="p-2 hover:bg-[var(--sidebar-hover)] rounded-lg transition-colors"
          aria-label="Toggle theme"
        >
          {currentTheme === "dark" ? (
            <MdLightMode className="w-5 h-5 text-yellow-300" />
          ) : (
            <MdDarkMode className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="h-[calc(100vh-4rem)] py-4">
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => {
            const isActive = pathname.startsWith(item.path);
            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 text-[15px] rounded-lg transition-all",
                    isActive
                      ? "bg-[var(--sidebar-active)] text-[var(--sidebar-text)] shadow-sm"
                      : "text-[var(--sidebar-text)] hover:bg-[var(--sidebar-hover)]"
                  )}
                >
                  {item.icon}
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
