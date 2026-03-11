"use client";

import Image from "next/image";
import { Menu, Sun, LogOut } from "lucide-react";

const TopNavbar = () => {
  return (
    <header className="dashboard-topbar">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <button className="text-gray-500 hover:text-gray-700 transition-colors cursor-pointer">
          <Menu size={20} />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand-blue flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="white" />
            </svg>
          </div>
          <span className="font-bold text-lg text-gray-900">
            SkillSpark<span className="text-brand-blue">AI</span>
          </span>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Level Badge */}
        <div className="hidden sm:flex flex-col items-end">
          <span className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">Level</span>
          <span className="text-sm font-bold text-gray-800">Intermediate</span>
        </div>

        {/* XP Progress */}
        <div className="hidden sm:flex items-center gap-2 bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100">
          <span className="text-yellow-500 text-sm">⭐</span>
          <span className="text-sm font-semibold text-brand-blue">343 / 1000 XP</span>
        </div>

        {/* Theme Toggle */}
        <button className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors cursor-pointer">
          <Sun size={16} />
        </button>

        {/* User Avatar */}
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-400 to-blue-500 overflow-hidden">
          <Image
            src="/user-avatar.png"
            alt="User"
            width={36}
            height={36}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Logout */}
        <button className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
};

export default TopNavbar;
