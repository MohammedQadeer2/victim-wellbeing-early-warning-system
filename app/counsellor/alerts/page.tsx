// Counsellor Alerts Page
// High-risk alerts requiring review

'use client';

import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { AlertCard } from '@/components/dashboard/AlertCard';
import { LoadingSpinner } from '@/components/ui/LoadingState';
import { EmptyState } from '@/components/ui/EmptyState';
import { COUNSELLOR_NAV_ITEMS, DEMO_USERS } from '@/constants';
import { getHighRiskAlerts } from '@/services/api';
import { Alert } from '@/types';

export default function AlertsPage() {
  const [loading, setLoading] = useState(true);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [filter, setFilter] = useState<'all' | 'new' | 'reviewed'>('all');
  
  useEffect(() => {
    async function loadData() {
      try {
        const data = await getHighRiskAlerts(DEMO_USERS.COUNSELLOR.id);
        setAlerts(data);
      } catch (error) {
        console.error('Error loading alerts:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, []);
  
  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'new') return alert.status === 'NEW';
    if (filter === 'reviewed') return alert.status !== 'NEW';
    return true;
  });
  
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
        title="High-Risk Alerts"
        description="Review and respond to system-generated alerts"
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
          All Alerts ({alerts.length})
        </button>
        <button
          onClick={() => setFilter('new')}
          className={`px-4 py-2 rounded-lg font-medium transition-smooth ${
            filter === 'new'
              ? 'bg-orange-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          New ({alerts.filter(a => a.status === 'NEW').length})
        </button>
        <button
          onClick={() => setFilter('reviewed')}
          className={`px-4 py-2 rounded-lg font-medium transition-smooth ${
            filter === 'reviewed'
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Reviewed ({alerts.filter(a => a.status !== 'NEW').length})
        </button>
      </div>
      
      {/* Alerts List */}
      {filteredAlerts.length === 0 ? (
        <EmptyState
          title="No alerts found"
          description={filter === 'all' ? 'There are no high-risk alerts at this time.' : `No ${filter} alerts found.`}
        />
      ) : (
        <div className="space-y-6">
          {filteredAlerts.map((alert) => (
            <AlertCard
              key={alert.id}
              alert={alert}
              showFullDetails={true}
              onAction={(alertId) => {
                // Navigate to victim details
                window.location.href = `/counsellor/victims/${alert.victimId}`;
              }}
            />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
