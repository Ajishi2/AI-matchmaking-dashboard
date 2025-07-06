'use client';

import { Bell, User, Monitor } from 'lucide-react';

export default function DashboardHeader() {
  return (
    <header className="bg-white shadow-sm border-b border-slate-200 lg:ml-0">
      <div className="flex items-center justify-between px-4 lg:px-6 py-4">
        {/* Hamburger menu (mobile only) */}
        <div className="lg:hidden flex items-center">
          {/* Place your hamburger button here or leave empty if handled elsewhere */}
          <div className="w-10 h-10 flex items-center justify-center" />
        </div>
        {/* Title */}
        <div className="flex-1 flex justify-center lg:justify-start">
          <h1 className="text-base sm:text-2xl font-bold text-slate-900 text-left leading-tight">
            <span className="block sm:inline">REAL-TIME</span>
            <span className="block sm:inline"> KPI DASHBOARD</span>
          </h1>
        </div>
        {/* Actions */}
        <div className="flex flex-col items-center space-y-1 sm:space-y-2">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button className="p-2 text-slate-400 hover:text-slate-600 relative">
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>
              <div className="flex flex-col items-start justify-center leading-tight">
                <span className="text-xs sm:text-sm font-bold text-blue-700">Admin</span>
                <span className="text-[10px] sm:text-xs text-slate-500 -mt-0.5">Event Organizer</span>
              </div>
            </div>
          </div>
          <button className="flex items-center justify-center mt-1 px-3 sm:px-4 py-2 bg-slate-900 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors">
            <Monitor className="w-4 h-4 mr-2" />
            PRESENTATION
          </button>
        </div>
      </div>
    </header>
  );
}