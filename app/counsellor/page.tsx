// Counsellor Dashboard Page
// Main operational dashboard for counsellors

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { StatCard } from '@/components/ui/StatCard';
import { RiskBadge, TrendBadge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingState';
import { COUNSELLOR_NAV_ITEMS, DEMO_USERS } from '@/constants';
import { getCounsellorDashboard } from '@/services/api';
import { CounsellorDashboardStats, CaseRequiringAttention } from '@/types';
import { formatDate } from '@/utils/formatting';

export default function CounsellorDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState<CounsellorDashboardStats | null>(null);
  
  useEffect(() => {
    async function loadData() {
      try {
        const data = await getCounsellorDashboard(DEMO_USERS.COUNSELLOR.id);
        setDashboard(data);
      } catch (error) {
        console.error('Error loading dashboard:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, []);
  
  if (loading) {
    return (
      <DashboardLayout
        userName={DEMO_USERS.COUNSELLOR.name}
        userRole="Counsellor"
        navItems={COUNSELLOR_NAV_ITEMS}
      >
        <LoadingSpinner size="lg" />
      </DashboardLayout>
    );
  }
  
  if (!dashboard) {
    return (
      <DashboardLayout
        userName={DEMO_USERS.COUNSELLOR.name}
        userRole="Counsellor"
        navItems={COUNSELLOR_NAV_ITEMS}
      >
        <p className="text-center text-gray-600">Unable to load dashboard data.</p>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout
      userName={DEMO_USERS.COUNSELLOR.name}
      userRole="Counsellor"
      navItems={COUNSELLOR_NAV_ITEMS}
    >
      <PageHeader
        title="Counsellor Dashboard"
        description="Monitor your assigned cases and respond to alerts"
      />
      
      {/* Alert Banner */}
      {dashboard.unreadAlerts > 0 && (
        <div className="mb-6">
          <Card className="bg-orange-50 border-orange-200">
            <div className="flex items-start justify-between">
              <div className="flex items-start">
                <span className="text-2xl mr-3">⚠️</span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {dashboard.unreadAlerts} New Alert{dashboard.unreadAlerts > 1 ? 's' : ''}
                  </h3>
                  <p className="text-base text-gray-700">
                    You have unread high-priority alerts that require attention.
                  </p>
                </div>
              </div>
              <Link href="/counsellor/alerts">
                <Button variant="danger" size="sm">
                  View Alerts
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      )}
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Assigned Cases"
          value={dashboard.assignedCases}
          subtitle="Total cases"
          color="blue"
        />
        <StatCard
          title="High-Risk Cases"
          value={dashboard.highRiskCases}
          subtitle="Require attention"
          color="red"
        />
        <StatCard
          title="Increasing Risk"
          value={dashboard.increasingRiskCases}
          subtitle="Escalating trend"
          color="red"
        />
        <StatCard
          title="Pending Interventions"
          value={dashboard.pendingInterventions}
          subtitle="To complete"
          color="yellow"
        />
      </div>
      
      {/* Cases Requiring Attention */}
      <Card className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Cases Requiring Attention
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              High-priority cases based on risk level and recent alerts
            </p>
          </div>
          <Link href="/counsellor/cases">
            <Button variant="secondary" size="sm">
              View All Cases
            </Button>
          </Link>
        </div>
        
        {dashboard.casesRequiringAttention.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-base text-gray-600">
              No cases requiring immediate attention.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                    Victim
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                    Case ID
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                    Distress
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                    Risk
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                    Trend
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                    Last Check-in
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {dashboard.casesRequiringAttention.map((item) => (
                  <tr key={item.victimId} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <p className="font-medium text-gray-900">{item.victimName}</p>
                      <p className="text-sm text-gray-600">{item.victimId}</p>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">
                      {item.caseId}
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-lg font-bold text-blue-600">
                        {item.currentDistress}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <RiskBadge level={item.riskLevel} size="sm" />
                    </td>
                    <td className="px-4 py-4">
                      <TrendBadge trend={item.trend as any} size="sm" />
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">
                      {formatDate(item.lastCheckIn)}
                    </td>
                    <td className="px-4 py-4">
                      <Link href={`/counsellor/victims/${item.victimId}`}>
                        <Button variant="primary" size="sm">
                          Review
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/counsellor/alerts" className="block">
          <Card className="hover:shadow-lg transition-smooth cursor-pointer h-full">
            <div className="text-center py-4">
              <div className="text-3xl mb-2">🚨</div>
              <h3 className="font-semibold text-gray-900 mb-1">View Alerts</h3>
              <p className="text-sm text-gray-600">{dashboard.unreadAlerts} new</p>
            </div>
          </Card>
        </Link>
        
        <Link href="/counsellor/cases" className="block">
          <Card className="hover:shadow-lg transition-smooth cursor-pointer h-full">
            <div className="text-center py-4">
              <div className="text-3xl mb-2">📋</div>
              <h3 className="font-semibold text-gray-900 mb-1">My Cases</h3>
              <p className="text-sm text-gray-600">{dashboard.assignedCases} assigned</p>
            </div>
          </Card>
        </Link>
        
        <Link href="/counsellor/interventions" className="block">
          <Card className="hover:shadow-lg transition-smooth cursor-pointer h-full">
            <div className="text-center py-4">
              <div className="text-3xl mb-2">🤝</div>
              <h3 className="font-semibold text-gray-900 mb-1">Interventions</h3>
              <p className="text-sm text-gray-600">{dashboard.pendingInterventions} pending</p>
            </div>
          </Card>
        </Link>
        
        <Link href="/counsellor/notifications" className="block">
          <Card className="hover:shadow-lg transition-smooth cursor-pointer h-full">
            <div className="text-center py-4">
              <div className="text-3xl mb-2">🔔</div>
              <h3 className="font-semibold text-gray-900 mb-1">Notifications</h3>
              <p className="text-sm text-gray-600">View all updates</p>
            </div>
          </Card>
        </Link>
      </div>
      
      {/* Today's Activity Summary */}
      <Card className="mt-8 bg-blue-50 border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Today's Activity
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-blue-600">{dashboard.checkInsToday}</p>
            <p className="text-sm text-gray-600">Check-ins Received</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-600">{dashboard.unreadAlerts}</p>
            <p className="text-sm text-gray-600">New Alerts</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-600">{dashboard.highRiskCases}</p>
            <p className="text-sm text-gray-600">High-Risk Cases</p>
          </div>
        </div>
      </Card>
    </DashboardLayout>
  );
}
