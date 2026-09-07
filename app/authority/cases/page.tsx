// Authority Cases Page
// Overview of all cases in the system

'use client';

import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { RiskBadge, StatusBadge } from '@/components/ui/Badge';
import { LoadingSpinner } from '@/components/ui/LoadingState';
import { AUTHORITY_NAV_ITEMS, DEMO_USERS } from '@/constants';
import { getAllCases } from '@/services/api';
import { Case } from '@/types';
import { formatDate } from '@/utils/formatting';

export default function AuthorityCasesPage() {
  const [loading, setLoading] = useState(true);
  const [cases, setCases] = useState<Case[]>([]);
  
  useEffect(() => {
    async function loadData() {
      try {
        const data = await getAllCases();
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
      <DashboardLayout userName={DEMO_USERS.AUTHORITY.name} userRole="Authority" navItems={AUTHORITY_NAV_ITEMS}>
        <LoadingSpinner size="lg" />
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout userName={DEMO_USERS.AUTHORITY.name} userRole="Authority" navItems={AUTHORITY_NAV_ITEMS}>
      <PageHeader
        title="All Cases"
        description="Complete list of cases under monitoring"
      />
      
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Case ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Victim ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Type</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Stage</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">District</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Registered</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {cases.map((caseItem) => (
                <tr key={caseItem.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">
                    {caseItem.id}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {caseItem.victimId}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {caseItem.caseType}
                  </td>
                  <td className="px-4 py-4">
                    <StatusBadge status={caseItem.status} size="sm" />
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {caseItem.stage}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {caseItem.district}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {formatDate(caseItem.registrationDate)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </DashboardLayout>
  );
}
