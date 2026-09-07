// Dashboard Layout component
// Main layout wrapper for role-based dashboards

'use client';

import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Sidebar, MobileSidebar, MobileSidebarToggle } from './Sidebar';

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
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navbar */}
      <Navbar userName={userName} userRole={userRole} showDemo={true} />
      
      {/* Main container with sidebar */}
      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar navItems={navItems} />
        </div>
        
        {/* Mobile Sidebar */}
        <MobileSidebar
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          navItems={navItems}
        />
        
        {/* Main content area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
      
      {/* Mobile menu toggle button */}
      <MobileSidebarToggle
        isOpen={mobileMenuOpen}
        onToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
      />
    </div>
  );
}
