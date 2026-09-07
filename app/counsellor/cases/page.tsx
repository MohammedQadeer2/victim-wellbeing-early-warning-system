// Counsellor Cases Page
// List of all assigned cases

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { RiskBadge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingState';
import { COUNSELLOR_NAV_ITEMS, DEMO_USERS } from '@/constants';
import { getCounsellorCases } from '@/services/api';
import { Victim } from '@/types';

export default function CasesPage() {
  const [loading, setLoading] = useState(true);
  const [cases, setCases] = useState<Victim[]>([]);
  const [filter, setFilter] = useState<'all' | 'high' | 'moderate' | 'low'>('all');
  
  useEffect(() => {
    async function loadData() {
      try {
        const data = await getCounsellorCases(DEMO_USERS.COUNSELLOR.id);
        setCases(data);
      } catch (error) {
        console.error('Error loading cases:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, []);
  
  if (loading) {
    return (
      <DashboardLayout userName={DEMO_USERS.COUNSELLOR.name} userRole="Counsellor" navItems={COUNSELLOR_NAV_ITEMS}>
        <LoadingSpinner size="lg" />
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout userName={DEMO_USERS.COUNSELLOR.name} userRole="Counsellor" navItems={COUNSELLOR_NAV_ITEMS}>
      <PageHeader
        title="My Cases"
        description="View and manage your assigned cases"
      />
      
      {/* Filter Tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-smooth ${
            filter === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Cases ({cases.length})
        </button>
        <button
          onClick={() => setFilter('high')}
          className={`px-4 py-2 rounded-lg font-medium transition-smooth ${
            filter === 'high'
              ? 'bg-red-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          High Risk
        </button>
        <button
          onClick={() => setFilter('moderate')}
          className={`px-4 py-2 rounded-lg font-medium transition-smooth ${
            filter === 'moderate'
              ? 'bg-yellow-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Moderate Risk
        </button>
        <button
          onClick={() => setFilter('low')}
          className={`px-4 py-2 rounded-lg font-medium transition-smooth ${
            filter === 'low'
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Low Risk
        </button>
      </div>
      
      {/* Cases Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {cases.map((victim) => (
          <Card key={victim.id}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {victim.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {victim.id} • {victim.district}
                </p>
              </div>
              <RiskBadge level="MODERATE" size="sm" />
            </div>
            
            <div className="space-y-2 mb-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Case ID:</span>
                <span className="font-medium text-gray-900">{victim.caseId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Age:</span>
                <span className="font-medium text-gray-900">{victim.age}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Registered:</span>
                <span className="font-medium text-gray-900">{victim.registrationDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Contact:</span>
                <span className="font-medium text-gray-900 capitalize">{victim.contactPreference}</span>
              </div>
            </div>
            
            <Link href={`/counsellor/victims/${victim.id}`}>
              <Button variant="primary" fullWidth>
                View Details
              </Button>
            </Link>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
