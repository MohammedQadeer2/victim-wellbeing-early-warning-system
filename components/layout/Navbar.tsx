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
      <div className="px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and title */}
          <div className="flex items-center">
            {/* Mobile: Logo triggers sidebar */}
            <div className="lg:hidden">
              <button
                onClick={onLogoClick}
                data-logo-trigger
                className="flex items-center space-x-1 sm:space-x-2 md:space-x-3 focus:outline-none"
                aria-label="Toggle menu"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-lg sm:text-xl font-bold">S</span>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-lg sm:text-xl font-bold text-gray-900">Sentinel</h1>
                  {showDemo && (
                    <span className="demo-badge text-xs">Prototype Demo</span>
                  )}
                </div>
              </button>
            </div>
            
            {/* Desktop: Logo links to home */}
            <Link href="/" className="hidden lg:flex items-center space-x-3 focus:outline-none">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl font-bold">S</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Sentinel</h1>
                {showDemo && (
                  <span className="demo-badge text-xs">Prototype Demo</span>
                )}
              </div>
            </Link>
          </div>
          
          {/* User info and actions */}
          {userName && (
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
              {/* User info */}
              <div className="text-right hidden sm:block">
                <p className="text-xs sm:text-sm font-medium text-gray-900">{userName}</p>
                {userRole && (
                  <p className="text-xs text-gray-600 capitalize">{userRole}</p>
                )}
              </div>
              
              {/* User avatar */}
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-gray-600 font-medium text-xs sm:text-sm">
                  {userName?.charAt(0).toUpperCase()}
                </span>
              </div>
              
              {/* Logout button */}
              <button
                onClick={handleLogout}
                className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 transition-smooth whitespace-nowrap"
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
