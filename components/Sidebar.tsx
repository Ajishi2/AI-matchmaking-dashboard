'use client';

import { useState } from 'react';
import { 
  BarChart3, 
  Calendar,
  GitBranch,
  CalendarCheck,
  User,
  FileText, 
  Settings,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Event Management', icon: Calendar, href: '#', active: false },
  { name: 'Real-Time Dashboard', icon: BarChart3, href: '#', active: true },
  { name: 'Matching Tracker', icon: GitBranch, href: '#', active: false },
  { name: 'Meeting Monitoring', icon: CalendarCheck, href: '#', active: false },
  { name: 'Participant Management', icon: User, href: '#', active: false },
  { name: 'Reports', icon: FileText, href: '#', active: false },
  { name: 'AI Matching Settings', icon: Settings, href: '#', active: false },
];

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile menu button (hamburger) - only show when sidebar is closed */}
      {!isMobileMenuOpen && (
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="lg:hidden fixed top-6 left-2 z-50 p-2 rounded-lg bg-white shadow-lg"
        >
          <Menu className="w-6 h-6" />
        </button>
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed top-0 left-0 z-40 w-64 h-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Close button inside sidebar header (mobile only) */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden absolute top-4 right-4 z-50 p-2 rounded-lg bg-white shadow-lg"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="p-6 border-b border-slate-200 pt-6 flex items-center space-x-2">
            <BarChart3 className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl font-bold text-slate-900">Dashboard</h1>
          </div>
          
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                    item.active
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                ><Icon className="w-5 h-5 mr-3" />
                  {item.name}
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}