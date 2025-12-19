import React from "react";
import { Link } from "react-router-dom";

export default function NavbarRegist() {
  return (
    <nav className="sticky top-0 z-50 h-20 w-full transition-all duration-300">
      {/* Glass Background */}
      <div className="absolute inset-0 bg-white/90 backdrop-blur-xl border-b border-green-100 shadow-sm shadow-emerald-500/5"></div>

      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* Left: Logo & Brand */}
        <div className="flex items-center gap-4 h-full">
          {/* Logo Container - Vertically Centered */}
          <Link to="/" className="relative group flex items-center justify-center">
            <div className="absolute inset-0 bg-emerald-400 rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300 scale-75"></div>
            <div className="relative bg-white p-2 rounded-xl shadow-sm ring-1 ring-emerald-50 group-hover:-translate-y-0.5 transition-transform duration-300 flex items-center justify-center">
              <img
                src="/Image/icon/icon browser tab.png"
                alt="Logo"
                className="h-9 w-9 object-contain"
              />
            </div>
          </Link>

          <div className="h-8 w-px bg-gray-200 hidden sm:block self-center mx-1"></div>

          <Link to="/" className="group flex items-center">
            <span className="font-bold text-xl tracking-tight text-emerald-900 group-hover:text-emerald-700 transition-colors">
              5G Learning Platform
            </span>
          </Link>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center justify-end">
          <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-white px-3 py-1.5 rounded-full border border-emerald-100 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Class Open
          </div>
        </div>
      </div>
    </nav>
  );
}
