// Navbar component
// Top navigation bar with user info and demo indicator

'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface NavbarProps {
  userName?: string;
  userRole?: string;
  showDemo?: boolean;
  onLogoClick?: () => void;
}

export function Navbar({ userName, userRole, showDemo = true, onLogoClick }: NavbarProps) {
  const router = useRouter();
  
  // Handle logout (demo mode)
  const handleLogout = () => {
    router.push('/login');
  };
  
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* LEFT: Logo + Title - Always visible */}
          <div className="flex items-center gap-3">
            {/* Logo Button - Mobile: triggers sidebar, Desktop: links home */}
            <button
              onClick={onLogoClick}
              data-logo-trigger
              className="lg:hidden flex items-center gap-2 focus:outline-none"
              aria-label="Toggle menu"
            >
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white text-lg font-bold">S</span>
              </div>
            </button>
            
            {/* Desktop Logo Link */}
            <Link href="/" className="hidden lg:flex items-center gap-2 focus:outline-none">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg font-bold">S</span>
              </div>
            </Link>
            
            {/* Title + Demo Badge */}
            <div className="flex flex-col gap-0">
              <h1 className="text-lg font-bold text-gray-900 leading-tight">Sentinel</h1>
              {showDemo && (
                <span className="demo-badge text-xs inline-w-fit">Prototype Demo</span>
              )}
            </div>
          </div>
          
          {/* RIGHT: User Info */}
          {userName && (
            <div className="flex items-center gap-4">
              {/* User Details */}
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{userName}</p>
                {userRole && (
                  <p className="text-xs text-gray-600">{userRole}</p>
                )}
              </div>
              
              {/* Avatar */}
              <div className="w-9 h-9 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-semibold text-gray-700">
                  {userName?.charAt(0).toUpperCase()}
                </span>
              </div>
              
              {/* Logout */}
              <button
                onClick={handleLogout}
                className="text-sm text-gray-600 hover:text-gray-900 transition-smooth"
                aria-label="Logout"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
