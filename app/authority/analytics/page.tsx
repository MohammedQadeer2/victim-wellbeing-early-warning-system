// Authority Analytics Page
// System analytics and insights

'use client';

import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { LoadingSpinner } from '@/components/ui/LoadingState';
import { RiskDistributionChart } from '@/components/charts/RiskDistributionChart';
import { AUTHORITY_NAV_ITEMS, DEMO_USERS } from '@/constants';
import { getAnalyticsSummary } from '@/services/api';
import { AnalyticsSummary } from '@/types';

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  
  useEffect(() => {
    async function loadData() {
      try {
        const data = await getAnalyticsSummary();
        setAnalytics(data);
      } catch (error) {
        console.error('Error loading analytics:', error);
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
  
  if (!analytics) {
    return (
      <DashboardLayout userName={DEMO_USERS.AUTHORITY.name} userRole="Authority" navItems={AUTHORITY_NAV_ITEMS}>
        <p className="text-center text-gray-600">Unable to load analytics.</p>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout userName={DEMO_USERS.AUTHORITY.name} userRole="Authority" navItems={AUTHORITY_NAV_ITEMS}>
      <PageHeader
        title="System Analytics"
        description={`Analysis for ${analytics.period}`}
      />
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <p className="text-sm text-gray-600 mb-2">Total Cases Monitored</p>
          <p className="text-4xl font-bold text-blue-600">{analytics.casesMonitored}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-600 mb-2">Avg. Distress Score</p>
          <p className="text-4xl font-bold text-yellow-600">{analytics.averageDistressScore}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-600 mb-2">Total Alerts</p>
          <p className="text-4xl font-bold text-orange-600">{analytics.totalAlerts}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-600 mb-2">Compliance Rate</p>
          <p className="text-4xl font-bold text-green-600">{analytics.checkInComplianceRate}%</p>
        </Card>
      </div>
      
      {/* Risk Distribution */}
      <Card className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Risk Distribution
        </h2>
        <RiskDistributionChart data={analytics.riskDistribution} height={350} />
      </Card>
      
      {/* District Breakdown */}
      <Card>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          District-wise Breakdown
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">District</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Active Cases</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Avg. Distress</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">High-Risk</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Alerts</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {analytics.districtBreakdown.map((district) => (
                <tr key={district.district} className="hover:bg-gray-50">
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">
                    {district.district}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {district.activeCases}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {district.averageDistress}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {district.highRiskCases}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {district.alertCount}
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
