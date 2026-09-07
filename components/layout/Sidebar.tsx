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

// Mobile sidebar overlay
export function MobileSidebar({
  isOpen,
  onClose,
  navItems,
}: {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
}) {
  if (!isOpen) return null;
  
  return (
    <>
      {/* Backdrop */}
      <div
        className="lg:hidden fixed inset-0 bg-gray-900 bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="lg:hidden fixed inset-y-0 left-0 w-64 bg-white z-50 shadow-xl">
        <Sidebar navItems={navItems} />
      </div>
    </>
  );
}
