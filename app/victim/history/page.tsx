// Check-in History Page
// Timeline view of all check-ins

'use client';

import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { RiskBadge, StatusBadge } from '@/components/ui/Badge';
import { LoadingSpinner } from '@/components/ui/LoadingState';
import { EmptyState } from '@/components/ui/EmptyState';
import { VICTIM_NAV_ITEMS, DEMO_USERS } from '@/constants';
import { getVictimCheckIns } from '@/services/api';
import { CheckIn } from '@/types';
import { formatDateTime } from '@/utils/formatting';

export default function HistoryPage() {
  const [loading, setLoading] = useState(true);
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
  
  useEffect(() => {
    async function loadData() {
      try {
        const data = await getVictimCheckIns(DEMO_USERS.VICTIM.id);
        setCheckIns(data);
      } catch (error) {
        console.error('Error loading check-ins:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, []);
  
  if (loading) {
    return (
      <DashboardLayout userName={DEMO_USERS.VICTIM.name} userRole="Victim" navItems={VICTIM_NAV_ITEMS}>
        <LoadingSpinner size="lg" />
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout userName={DEMO_USERS.VICTIM.name} userRole="Victim" navItems={VICTIM_NAV_ITEMS}>
      <PageHeader
        title="Check-in History"
        description="View all your previous check-ins and their results"
      />
      
      {checkIns.length === 0 ? (
        <EmptyState
          title="No check-ins yet"
          description="You haven't completed any check-ins. Complete your first check-in to start tracking your well-being."
          actionLabel="Start Check-in"
          onAction={() => window.location.href = '/victim/check-in'}
        />
      ) : (
        <div className="space-y-6">
          {checkIns.slice().reverse().map((checkIn) => (
            <Card key={checkIn.id}>
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-lg font-semibold text-gray-900">
                    {formatDateTime(checkIn.timestamp)}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <StatusBadge status={checkIn.status} size="sm" />
                    {checkIn.reviewedBy && (
                      <span className="text-sm text-gray-600">
                        Reviewed by counsellor
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-blue-600 mb-2">
                    {checkIn.distressScore}
                  </p>
                  <RiskBadge level={checkIn.riskLevel} size="sm" />
                </div>
              </div>
              
              {/* Key Signals */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                  Detected Signals:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {checkIn.aiAnalysis.detectedSignals.map((signal, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {signal.type.replace(/_/g, ' ')}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Text Response */}
              {checkIn.textResponse && (
                <div className="pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    Your Note:
                  </h4>
                  <p className="text-base text-gray-700 leading-relaxed">
                    {checkIn.textResponse}
                  </p>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
