// Authority High-Risk Cases Page
// Cases requiring immediate attention

'use client';

import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { RiskBadge, TrendBadge } from '@/components/ui/Badge';
import { LoadingSpinner } from '@/components/ui/LoadingState';
import { AUTHORITY_NAV_ITEMS, DEMO_USERS } from '@/constants';
import { getHighRiskCases } from '@/services/api';
import { formatDate } from '@/utils/formatting';

export default function HighRiskCasesPage() {
  const [loading, setLoading] = useState(true);
  const [cases, setCases] = useState<any[]>([]);
  
  useEffect(() => {
    async function loadData() {
      try {
        const data = await getHighRiskCases();
        setCases(data);
      } catch (error) {
        console.error('Error loading high-risk cases:', error);
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
        title="High-Risk Cases"
        description="Cases with elevated distress levels requiring attention"
      />
      
      {/* Summary */}
      <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-base text-gray-900">
          <strong>{cases.length}</strong> high-risk cases identified based on AI analysis and distress trends.
        </p>
      </div>
      
      <div className="space-y-6">
        {cases.map((item) => (
          <Card key={item.victim.id}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {item.victim.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {item.victim.id} • {item.case.id} • {item.victim.district}
                </p>
              </div>
              <RiskBadge level={item.riskLevel} size="md" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600">Distress Score</p>
                <p className="text-2xl font-bold text-blue-600">{item.distressScore}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Risk Level</p>
                <RiskBadge level={item.riskLevel} size="sm" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Trend</p>
                <TrendBadge trend={item.trend} size="sm" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Case Type</p>
                <p className="text-sm font-medium text-gray-900">{item.case.caseType}</p>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Case Stage: <strong>{item.case.stage}</strong> • 
                Status: <strong>{item.case.status}</strong> •
                Assigned Counsellor: <strong>{item.victim.assignedCounsellor || 'Pending'}</strong>
              </p>
            </div>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
