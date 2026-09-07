// Authority Dashboard Page
// High-level system overview for authorities

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { StatCard } from '@/components/ui/StatCard';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingState';
import { RiskDistributionChart } from '@/components/charts/RiskDistributionChart';
import { AUTHORITY_NAV_ITEMS, DEMO_USERS } from '@/constants';
import { getAuthorityDashboard, getRiskDistribution, getSystemTrends } from '@/services/api';
import { AuthorityDashboardStats, RiskDistribution, SystemTrendData } from '@/types';

export default function AuthorityDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState<AuthorityDashboardStats | null>(null);
  const [riskData, setRiskData] = useState<RiskDistribution[]>([]);
  const [trends, setTrends] = useState<SystemTrendData[]>([]);
  
  useEffect(() => {
    async function loadData() {
      try {
        const [dashboardData, riskDistribution, systemTrends] = await Promise.all([
          getAuthorityDashboard(),
          getRiskDistribution(),
          getSystemTrends(),
        ]);
        
        setDashboard(dashboardData);
        setRiskData(riskDistribution);
        setTrends(systemTrends);
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
        userName={DEMO_USERS.AUTHORITY.name}
        userRole="Authority"
        navItems={AUTHORITY_NAV_ITEMS}
      >
        <LoadingSpinner size="lg" />
      </DashboardLayout>
    );
  }
  
  if (!dashboard) {
    return (
      <DashboardLayout
        userName={DEMO_USERS.AUTHORITY.name}
        userRole="Authority"
        navItems={AUTHORITY_NAV_ITEMS}
      >
        <p className="text-center text-gray-600">Unable to load dashboard data.</p>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout
      userName={DEMO_USERS.AUTHORITY.name}
      userRole="Authority"
      navItems={AUTHORITY_NAV_ITEMS}
    >
      <PageHeader
        title="System Overview"
        description="Monitor victim well-being across all cases"
      />
      
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Active Cases"
          value={dashboard.totalActiveCases}
          subtitle="Under monitoring"
          color="blue"
        />
        <StatCard
          title="High-Risk Cases"
          value={dashboard.highRiskCases}
          subtitle="Require attention"
          color="red"
        />
        <StatCard
          title="Alerts Today"
          value={dashboard.alertsToday}
          subtitle="System-generated"
          color="red"
        />
        <StatCard
          title="Check-in Compliance"
          value={`${dashboard.checkInComplianceRate}%`}
          subtitle="Participation rate"
          color="green"
        />
      </div>
      
      {/* Risk Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Chart */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Risk Distribution
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Current distribution of cases by risk level
          </p>
          <RiskDistributionChart data={riskData} height={300} />
        </Card>
        
        {/* Breakdown */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Risk Breakdown
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Detailed case counts by risk category
          </p>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div>
                <p className="font-semibold text-gray-900">Low Risk</p>
                <p className="text-sm text-gray-600">Stable cases</p>
              </div>
              <span className="text-3xl font-bold text-green-600">
                {dashboard.lowRiskCases}
              </span>
            </div>
            <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
              <div>
                <p className="font-semibold text-gray-900">Moderate Risk</p>
                <p className="text-sm text-gray-600">Monitoring required</p>
              </div>
              <span className="text-3xl font-bold text-yellow-600">
                {dashboard.moderateRiskCases}
              </span>
            </div>
            <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
              <div>
                <p className="font-semibold text-gray-900">High Risk</p>
                <p className="text-sm text-gray-600">Active intervention</p>
              </div>
              <span className="text-3xl font-bold text-orange-600">
                {dashboard.highRiskCases}
              </span>
            </div>
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
              <div>
                <p className="font-semibold text-gray-900">Critical Risk</p>
                <p className="text-sm text-gray-600">Urgent attention</p>
              </div>
              <span className="text-3xl font-bold text-red-600">
                {dashboard.criticalRiskCases}
              </span>
            </div>
          </div>
        </Card>
      </div>
      
      {/* System Activity */}
      <Card className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          System Activity
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-blue-50 rounded-lg">
            <p className="text-4xl font-bold text-blue-600 mb-2">
              {dashboard.interventionsActive}
            </p>
            <p className="text-sm text-gray-600">Active Interventions</p>
          </div>
          <div className="text-center p-6 bg-purple-50 rounded-lg">
            <p className="text-4xl font-bold text-purple-600 mb-2">
              {dashboard.alertsToday}
            </p>
            <p className="text-sm text-gray-600">Alerts Generated Today</p>
          </div>
          <div className="text-center p-6 bg-green-50 rounded-lg">
            <p className="text-4xl font-bold text-green-600 mb-2">
              {dashboard.checkInComplianceRate}%
            </p>
            <p className="text-sm text-gray-600">Check-in Compliance</p>
          </div>
        </div>
      </Card>
      
      {/* Quick Access */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/authority/cases" className="block">
          <Card className="hover:shadow-lg transition-smooth cursor-pointer h-full">
            <div className="text-center py-4">
              <div className="text-3xl mb-2">📋</div>
              <h3 className="font-semibold text-gray-900 mb-1">All Cases</h3>
              <p className="text-sm text-gray-600">{dashboard.totalActiveCases} active</p>
            </div>
          </Card>
        </Link>
        
        <Link href="/authority/high-risk" className="block">
          <Card className="hover:shadow-lg transition-smooth cursor-pointer h-full">
            <div className="text-center py-4">
              <div className="text-3xl mb-2">⚠️</div>
              <h3 className="font-semibold text-gray-900 mb-1">High-Risk</h3>
              <p className="text-sm text-gray-600">{dashboard.highRiskCases + dashboard.criticalRiskCases} cases</p>
            </div>
          </Card>
        </Link>
        
        <Link href="/authority/alerts" className="block">
          <Card className="hover:shadow-lg transition-smooth cursor-pointer h-full">
            <div className="text-center py-4">
              <div className="text-3xl mb-2">🔔</div>
              <h3 className="font-semibold text-gray-900 mb-1">Alerts</h3>
              <p className="text-sm text-gray-600">{dashboard.alertsToday} today</p>
            </div>
          </Card>
        </Link>
        
        <Link href="/authority/analytics" className="block">
          <Card className="hover:shadow-lg transition-smooth cursor-pointer h-full">
            <div className="text-center py-4">
              <div className="text-3xl mb-2">📊</div>
              <h3 className="font-semibold text-gray-900 mb-1">Analytics</h3>
              <p className="text-sm text-gray-600">View insights</p>
            </div>
          </Card>
        </Link>
      </div>
      
      {/* System Health Indicator */}
      <Card className="mt-8 bg-green-50 border-green-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-3xl mr-4">✓</span>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                System Operational
              </h3>
              <p className="text-sm text-gray-700">
                All monitoring and alert systems functioning normally. 
                {dashboard.checkInComplianceRate}% check-in participation rate.
              </p>
            </div>
          </div>
          <Link href="/authority/reports">
            <Button variant="secondary">
              Generate Report
            </Button>
          </Link>
        </div>
      </Card>
    </DashboardLayout>
  );
}
