// Dashboard Layout component
// Main layout wrapper for role-based dashboards

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './Navbar';
import { Sidebar, MobileSidebar } from './Sidebar';

interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  userName: string;
  userRole: string;
  navItems: NavItem[];
}

export function DashboardLayout({
  children,
  userName,
  userRole,
  navItems,
}: DashboardLayoutProps) {
  // Mobile sidebar state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  
  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuOpen && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        // Check if click is not on the logo
        const target = event.target as HTMLElement;
        if (!target.closest('[data-logo-trigger]')) {
          setMobileMenuOpen(false);
        }
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileMenuOpen]);
  
  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Top Navbar */}
      <Navbar 
        userName={userName} 
        userRole={userRole} 
        showDemo={true}
        onLogoClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      />
      
      {/* Main container with sidebar - Proper height */}
      <div className="flex min-h-screen w-full">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <Sidebar navItems={navItems} />
        </div>
        
        {/* Mobile Sidebar with outside click close */}
        <div ref={sidebarRef}>
          <MobileSidebar
            isOpen={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
            navItems={navItems}
          />
        </div>
        
        {/* Main content area - Full height, proper overflow */}
        <main className="flex-1 overflow-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
