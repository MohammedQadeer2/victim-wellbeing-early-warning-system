// Sidebar navigation component
// Role-specific navigation menu

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface SidebarProps {
  navItems: NavItem[];
  className?: string;
}

export function Sidebar({ navItems, className = '' }: SidebarProps) {
  const pathname = usePathname();
  
  // Check if link is active
  const isActive = (href: string) => {
    return pathname === href || pathname?.startsWith(href + '/');
  };
  
  return (
    <aside className={`w-64 bg-white border-r border-gray-200 min-h-screen ${className}`}>
      <nav className="p-4 space-y-1">
        {navItems.map((item) => {
          const active = isActive(item.href);
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center px-4 py-3 rounded-lg text-base font-medium transition-smooth
                ${active
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-gray-700 hover:bg-gray-50 border border-transparent'
                }
              `}
            >
              {item.icon && (
                <span className="mr-3">{item.icon}</span>
              )}
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

// Mobile sidebar toggle button
export function MobileSidebarToggle({
  isOpen,
  onToggle,
}: {
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="lg:hidden fixed bottom-4 right-4 z-50 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition-smooth"
      aria-label="Toggle navigation menu"
    >
      {isOpen ? (
        <span className="text-2xl">×</span>
      ) : (
        <span className="text-xl">☰</span>
      )}
    </button>
  );
}

// Mobile sidebar overlay with smooth animation
export function MobileSidebar({
  isOpen,
  onClose,
  navItems,
}: {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
}) {
  const pathname = usePathname();
  
  // Check if link is active
  const isActive = (href: string) => {
    return pathname === href || pathname?.startsWith(href + '/');
  };
  
  return (
    <>
      {/* Backdrop - fades in/out */}
      <div
        className={`lg:hidden fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
          isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Sidebar - slides in from left */}
      <div
        className={`lg:hidden fixed inset-y-0 left-0 w-72 sm:w-80 bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Close Button - minimal header */}
        <div className="flex justify-end p-4 border-b border-gray-200">
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="p-4 space-y-2 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 80px)' }}>
          {navItems.map((item) => {
            const active = isActive(item.href);
            
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`
                  flex items-center px-4 py-3.5 rounded-xl text-base font-medium transition-all
                  ${active
                    ? 'bg-blue-50 text-blue-700 border-2 border-blue-200 shadow-sm'
                    : 'text-gray-700 hover:bg-gray-50 border-2 border-transparent'
                  }
                `}
              >
                {item.icon && (
                  <span className="mr-3 text-xl">{item.icon}</span>
                )}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
