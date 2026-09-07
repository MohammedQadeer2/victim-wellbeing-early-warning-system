// Login/Demo Selection Page
// Allows users to select their role for demo purposes

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  
  // Demo login - navigate to appropriate dashboard
  const handleLogin = (role: string) => {
    setSelectedRole(role);
    
    // Simulate brief loading
    setTimeout(() => {
      switch (role) {
        case 'victim':
          router.push('/victim');
          break;
        case 'counsellor':
          router.push('/counsellor');
          break;
        case 'authority':
          router.push('/authority');
          break;
      }
    }, 500);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      {/* Header */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl font-bold">S</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Sentinel</h1>
            </Link>
            
            <Link href="/">
              <Button variant="ghost">← Back to Home</Button>
            </Link>
          </div>
        </div>
      </nav>
      
      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-4xl w-full">
          {/* Title */}
          <div className="text-center mb-10">
            <div className="mb-4 flex justify-center">
              <span className="demo-badge">Prototype Demo</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Select Your Role
            </h1>
            <p className="text-lg text-gray-600">
              Choose a role to explore the system with demo data
            </p>
          </div>
          
          {/* Role cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Victim Role */}
            <Card
              className={`cursor-pointer transition-all hover:shadow-xl ${
                selectedRole === 'victim' ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">👤</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Victim
                </h2>
                <p className="text-base text-gray-600 mb-6">
                  Access your dashboard, complete check-ins, and view well-being information
                </p>
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => handleLogin('victim')}
                  disabled={selectedRole !== null && selectedRole !== 'victim'}
                >
                  {selectedRole === 'victim' ? 'Loading...' : 'Continue as Victim'}
                </Button>
              </div>
            </Card>
            
            {/* Counsellor Role */}
            <Card
              className={`cursor-pointer transition-all hover:shadow-xl ${
                selectedRole === 'counsellor' ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">💼</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Counsellor
                </h2>
                <p className="text-base text-gray-600 mb-6">
                  Monitor assigned cases, review alerts, and manage interventions
                </p>
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => handleLogin('counsellor')}
                  disabled={selectedRole !== null && selectedRole !== 'counsellor'}
                >
                  {selectedRole === 'counsellor' ? 'Loading...' : 'Continue as Counsellor'}
                </Button>
              </div>
            </Card>
            
            {/* Authority Role */}
            <Card
              className={`cursor-pointer transition-all hover:shadow-xl ${
                selectedRole === 'authority' ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🏛️</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Authority
                </h2>
                <p className="text-base text-gray-600 mb-6">
                  View system overview, analytics, and high-risk case reports
                </p>
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => handleLogin('authority')}
                  disabled={selectedRole !== null && selectedRole !== 'authority'}
                >
                  {selectedRole === 'authority' ? 'Loading...' : 'Continue as Authority'}
                </Button>
              </div>
            </Card>
          </div>
          
          {/* Information notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Demo Mode Information</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• This is a prototype demonstration with synthetic data</li>
              <li>• No real authentication or backend services are connected</li>
              <li>• Data shown is for demonstration purposes only</li>
              <li>• All user information is anonymized</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
