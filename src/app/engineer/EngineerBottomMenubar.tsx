"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdHome, MdAssignment, MdPerson } from "react-icons/md";
import clsx from "clsx";

const menuItems = [
  { label: "Home", href: "/engineer", icon: <MdHome /> },
  { label: "Inquiries", href: "/engineer/inquiries", icon: <MdAssignment /> },
  { label: "My Account", href: "/engineer/account", icon: <MdPerson /> },
];

function EngineerBottomMenubar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-md sm:hidden">
      <ul className="flex justify-around items-center h-16">
        {menuItems.map((item) => {
          const isActive =
            pathname === "/engineer" && item.href === "/engineer"
              ? true
              : pathname.startsWith(item.href) && item.href !== "/engineer";

          return (
            <li key={item.href} className="flex-1 text-center">
              <Link
                href={item.href}
                className={clsx(
                  "flex flex-col items-center justify-center text-xs font-medium py-2 transition-all duration-150 rounded-md",
                  isActive
                    ? "bg-indigo-100 dark:bg-indigo-800 text-indigo-600 dark:text-indigo-300"
                    : "text-gray-600 dark:text-gray-300"
                )}
              >
                <div
                  className={clsx(
                    "text-xl mb-1",
                    isActive
                      ? "text-indigo-600 dark:text-indigo-300"
                      : "text-gray-500 dark:text-gray-400"
                  )}
                >
                  {item.icon}
                </div>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default EngineerBottomMenubar;
