"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaConciergeBell,
  FaBox,
  FaShoppingBag,
  FaUser,
} from "react-icons/fa";

const navItems = [
  { icon: <FaHome />, label: "Home", href: "/" },
  { icon: <FaConciergeBell />, label: "Services", href: "/services" },
  { icon: <FaBox />, label: "Product", href: "/products" },
  { icon: <FaShoppingBag />, label: "Bookings", href: "/bookings" },
  { icon: <FaUser />, label: "Profile", href: "/profile" },
];

export default function BottomNav({ active }: { active?: string }) {
  const pathname = usePathname();
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md flex justify-around py-3 z-50">
      {navItems.map((item) => (
        <Link
          href={item.href}
          key={item.label}
          className={`flex flex-col items-center text-sm ${
            pathname === item.href
              ? "text-blue-600 font-semibold"
              : "text-gray-600"
          }`}
        >
          {item.icon}
          <span>{item.label}</span>
        </Link>
      ))}
    </div>
  );
}
