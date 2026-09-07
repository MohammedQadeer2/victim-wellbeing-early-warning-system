// Victim Dashboard Page
// Main dashboard showing current well-being status and quick actions

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { StatCard } from '@/components/ui/StatCard';
import { DistressScoreCard } from '@/components/dashboard/DistressScoreCard';
import { SignalList } from '@/components/dashboard/SignalCard';
import { LoadingSpinner } from '@/components/ui/LoadingState';
import { DistressTrendChart } from '@/components/charts/DistressTrendChart';
import { VICTIM_NAV_ITEMS, DEMO_USERS } from '@/constants';
import { getVictimDashboard, getVictimDistressHistory } from '@/services/api';
import { VictimDashboard, DistressHistory } from '@/types';
import { formatDate } from '@/utils/formatting';

export default function VictimDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState<VictimDashboard | null>(null);
  const [distressHistory, setDistressHistory] = useState<DistressHistory[]>([]);
  
  // Load dashboard data
  useEffect(() => {
    async function loadData() {
      try {
        // Fetch victim dashboard data
        const dashboardData = await getVictimDashboard(DEMO_USERS.VICTIM.id);
        const historyData = await getVictimDistressHistory(DEMO_USERS.VICTIM.id);
        
        setDashboard(dashboardData);
        setDistressHistory(historyData);
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
        userName={DEMO_USERS.VICTIM.name}
        userRole="Victim"
        navItems={VICTIM_NAV_ITEMS}
      >
        <LoadingSpinner size="lg" />
      </DashboardLayout>
    );
  }
  
  if (!dashboard) {
    return (
      <DashboardLayout
        userName={DEMO_USERS.VICTIM.name}
        userRole="Victim"
        navItems={VICTIM_NAV_ITEMS}
      >
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">Unable to load dashboard data.</p>
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout
      userName={DEMO_USERS.VICTIM.name}
      userRole="Victim"
      navItems={VICTIM_NAV_ITEMS}
    >
      {/* Page Header */}
      <PageHeader
        title="Welcome back"
        description="Your well-being matters. We're here to support you throughout your journey."
      />
      
      {/* Alert if upcoming support */}
      {dashboard.upcomingSupport && (
        <div className="mb-6">
          <Card className="bg-blue-50 border-blue-200">
            <div className="flex items-start">
              <span className="text-2xl mr-3">ℹ️</span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Upcoming Support</h3>
                <p className="text-base text-gray-700">{dashboard.upcomingSupport}</p>
              </div>
            </div>
          </Card>
        </div>
      )}
      
      {/* Current Status Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Distress Score Card */}
        <div className="lg:col-span-1">
          <DistressScoreCard
            score={dashboard.currentDistressScore}
            riskLevel={dashboard.riskLevel}
            trend={dashboard.trend}
            lastUpdated={formatDate(dashboard.lastCheckInDate)}
          />
        </div>
        
        {/* Recent Signals */}
        <Card className="lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Signals
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            These are indicators detected from your recent check-ins.
          </p>
          <SignalList signals={dashboard.recentSignals} />
        </Card>
      </div>
      
      {/* Check-in CTA */}
      <Card className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <div className="text-center py-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            How are you feeling today?
          </h2>
          <p className="text-base text-gray-700 mb-6 max-w-2xl mx-auto">
            Regular check-ins help us understand your well-being and provide timely support when needed.
          </p>
          <Link href="/victim/check-in">
            <Button variant="primary" size="lg">
              Start Check-in
            </Button>
          </Link>
          <p className="text-sm text-gray-600 mt-3">
            Next check-in due: {formatDate(dashboard.nextCheckInDue)}
          </p>
        </div>
      </Card>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Current Risk Level"
          value={dashboard.riskLevel}
          color={dashboard.riskLevel === 'HIGH' ? 'red' : dashboard.riskLevel === 'MODERATE' ? 'yellow' : 'green'}
        />
        <StatCard
          title="Trend"
          value={dashboard.trend}
          color={dashboard.trend === 'INCREASING' ? 'red' : dashboard.trend === 'STABLE' ? 'blue' : 'green'}
        />
        <StatCard
          title="Last Check-in"
          value={formatDate(dashboard.lastCheckInDate)}
          subtitle="Days ago"
          color="gray"
        />
      </div>
      
      {/* Well-being Trend Chart */}
      <Card className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Your Well-being Trend
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          This chart shows how your distress levels have changed over time.
        </p>
        <DistressTrendChart data={distressHistory} height={300} />
      </Card>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/victim/check-in" className="block">
          <Card className="hover:shadow-lg transition-smooth cursor-pointer h-full">
            <div className="text-center py-4">
              <div className="text-3xl mb-2">📝</div>
              <h3 className="font-semibold text-gray-900 mb-1">Check-in</h3>
              <p className="text-sm text-gray-600">Complete your check-in</p>
            </div>
          </Card>
        </Link>
        
        <Link href="/victim/assistant" className="block">
          <Card className="hover:shadow-lg transition-smooth cursor-pointer h-full">
            <div className="text-center py-4">
              <div className="text-3xl mb-2">💬</div>
              <h3 className="font-semibold text-gray-900 mb-1">AI Assistant</h3>
              <p className="text-sm text-gray-600">Talk about how you feel</p>
            </div>
          </Card>
        </Link>
        
        <Link href="/victim/wellbeing" className="block">
          <Card className="hover:shadow-lg transition-smooth cursor-pointer h-full">
            <div className="text-center py-4">
              <div className="text-3xl mb-2">📊</div>
              <h3 className="font-semibold text-gray-900 mb-1">My Well-being</h3>
              <p className="text-sm text-gray-600">View detailed trends</p>
            </div>
          </Card>
        </Link>
        
        <Link href="/victim/support" className="block">
          <Card className="hover:shadow-lg transition-smooth cursor-pointer h-full">
            <div className="text-center py-4">
              <div className="text-3xl mb-2">🆘</div>
              <h3 className="font-semibold text-gray-900 mb-1">Get Support</h3>
              <p className="text-sm text-gray-600">Access help services</p>
            </div>
          </Card>
        </Link>
      </div>
    </DashboardLayout>
  );
}
