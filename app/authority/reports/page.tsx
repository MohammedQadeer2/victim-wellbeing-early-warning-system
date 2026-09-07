// Authority Reports Page
// Generate and view system reports

'use client';

import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingState';
import { AUTHORITY_NAV_ITEMS, DEMO_USERS } from '@/constants';
import { getAnalyticsSummary } from '@/services/api';
import { AnalyticsSummary } from '@/types';

export default function ReportsPage() {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  
  useEffect(() => {
    async function loadData() {
      try {
        const data = await getAnalyticsSummary();
        setSummary(data);
      } catch (error) {
        console.error('Error loading summary:', error);
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
  
  if (!summary) {
    return (
      <DashboardLayout userName={DEMO_USERS.AUTHORITY.name} userRole="Authority" navItems={AUTHORITY_NAV_ITEMS}>
        <p className="text-center text-gray-600">Unable to load report data.</p>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout userName={DEMO_USERS.AUTHORITY.name} userRole="Authority" navItems={AUTHORITY_NAV_ITEMS}>
      <PageHeader
        title="System Reports"
        description="Generate and download system reports"
      />
      
      {/* Report Summary */}
      <Card className="mb-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {summary.period} Report Summary
            </h2>
            <p className="text-sm text-gray-600">
              Reporting Period: {summary.startDate} to {summary.endDate}
            </p>
          </div>
          <Button variant="primary">
            📥 Download Report
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Total Cases</p>
            <p className="text-3xl font-bold text-blue-600">{summary.totalCases}</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Cases Monitored</p>
            <p className="text-3xl font-bold text-green-600">{summary.casesMonitored}</p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Avg. Distress</p>
            <p className="text-3xl font-bold text-yellow-600">{summary.averageDistressScore}</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Total Alerts</p>
            <p className="text-3xl font-bold text-purple-600">{summary.totalAlerts}</p>
          </div>
        </div>
      </Card>
      
      {/* Interventions Summary */}
      <Card className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Interventions Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-gray-900 mb-2">
              {summary.interventionsRecorded}
            </p>
            <p className="text-sm text-gray-600">Interventions Recorded</p>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-gray-900 mb-2">
              {summary.checkInComplianceRate}%
            </p>
            <p className="text-sm text-gray-600">Check-in Compliance</p>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-gray-900 mb-2">
              {summary.riskDistribution.filter(r => r.riskLevel === 'HIGH' || r.riskLevel === 'CRITICAL').reduce((sum, r) => sum + r.count, 0)}
            </p>
            <p className="text-sm text-gray-600">High Priority Cases</p>
          </div>
        </div>
      </Card>
      
      {/* Available Reports */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Available Report Types
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
            <div>
              <h4 className="font-medium text-gray-900">Monthly Summary Report</h4>
              <p className="text-sm text-gray-600">Comprehensive overview of system activity</p>
            </div>
            <Button variant="secondary" size="sm">
              Generate
            </Button>
          </div>
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
            <div>
              <h4 className="font-medium text-gray-900">High-Risk Cases Report</h4>
              <p className="text-sm text-gray-600">Detailed analysis of high-risk cases</p>
            </div>
            <Button variant="secondary" size="sm">
              Generate
            </Button>
          </div>
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
            <div>
              <h4 className="font-medium text-gray-900">District-wise Report</h4>
              <p className="text-sm text-gray-600">Breakdown by geographical district</p>
            </div>
            <Button variant="secondary" size="sm">
              Generate
            </Button>
          </div>
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
            <div>
              <h4 className="font-medium text-gray-900">Intervention Effectiveness Report</h4>
              <p className="text-sm text-gray-600">Analysis of intervention outcomes</p>
            </div>
            <Button variant="secondary" size="sm">
              Generate
            </Button>
          </div>
        </div>
      </Card>
      
      {/* Demo Note */}
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-gray-700">
          <strong>Prototype Note:</strong> Report generation is a demo feature. In production, these would generate PDF/Excel reports with detailed analytics and be sent to authorized personnel.
        </p>
      </div>
    </DashboardLayout>
  );
}
