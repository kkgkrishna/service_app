import { MdMenu } from "react-icons/md";
import { useTheme } from "@/context/ThemeContext";

interface HeaderProps {
  onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <div className="h-16 bg-[var(--gradient-header)] backdrop-blur-md bg-opacity-90 flex items-center justify-between px-6 text-white shadow-lg z-50">
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
          Arya Services
        </span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-white/90">Welcome, Admin</span>
        <div className="w-10 h-10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 hover:border-white/20 transition-colors shadow-inner">
          <svg
            className="w-6 h-6 text-white/90"
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
  );
}
