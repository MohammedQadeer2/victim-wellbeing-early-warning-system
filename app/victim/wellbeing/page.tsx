// My Well-being Page
// Detailed view of longitudinal well-being data

'use client';

import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { StatCard } from '@/components/ui/StatCard';
import { RiskBadge, TrendBadge } from '@/components/ui/Badge';
import { LoadingSpinner } from '@/components/ui/LoadingState';
import { DistressTrendChart } from '@/components/charts/DistressTrendChart';
import { VICTIM_NAV_ITEMS, DEMO_USERS } from '@/constants';
import { getVictimDashboard, getVictimDistressHistory } from '@/services/api';
import { VictimDashboard, DistressHistory } from '@/types';
import { formatDate } from '@/utils/formatting';

export default function WellbeingPage() {
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState<VictimDashboard | null>(null);
  const [history, setHistory] = useState<DistressHistory[]>([]);
  
  useEffect(() => {
    async function loadData() {
      try {
        const [dashboardData, historyData] = await Promise.all([
          getVictimDashboard(DEMO_USERS.VICTIM.id),
          getVictimDistressHistory(DEMO_USERS.VICTIM.id),
        ]);
        
        setDashboard(dashboardData);
        setHistory(historyData);
      } catch (error) {
        console.error('Error loading data:', error);
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
  
  if (!dashboard || !history.length) {
    return (
      <DashboardLayout userName={DEMO_USERS.VICTIM.name} userRole="Victim" navItems={VICTIM_NAV_ITEMS}>
        <p className="text-center text-gray-600">Unable to load well-being data.</p>
      </DashboardLayout>
    );
  }
  
  // Calculate statistics
  const firstScore = history[0].distressScore;
  const latestScore = history[history.length - 1].distressScore;
  const changePercentage = ((latestScore - firstScore) / firstScore * 100).toFixed(1);
  
  return (
    <DashboardLayout userName={DEMO_USERS.VICTIM.name} userRole="Victim" navItems={VICTIM_NAV_ITEMS}>
      <PageHeader
        title="My Well-being"
        description="Track your well-being journey over time"
      />
      
      {/* Current Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Current Score"
          value={dashboard.currentDistressScore}
          color={dashboard.currentDistressScore > 70 ? 'red' : dashboard.currentDistressScore > 50 ? 'yellow' : 'green'}
        />
        <StatCard
          title="Risk Level"
          value={dashboard.riskLevel}
          color={dashboard.riskLevel === 'HIGH' ? 'red' : 'yellow'}
        />
        <StatCard
          title="Trend"
          value={dashboard.trend}
          color={dashboard.trend === 'INCREASING' ? 'red' : 'green'}
        />
        <StatCard
          title="Change"
          value={`${changePercentage}%`}
          subtitle="Since first check-in"
          color="gray"
        />
      </div>
      
      {/* Trend Chart */}
      <Card className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Distress Trend Over Time
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Your distress trend has been <TrendBadge trend={dashboard.trend} /> over the past weeks.
        </p>
        <DistressTrendChart data={history} height={400} />
      </Card>
      
      {/* Check-in Summary */}
      <Card>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Check-in Summary
        </h2>
        <div className="space-y-4">
          {history.slice().reverse().map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <p className="font-medium text-gray-900">{formatDate(item.date)}</p>
                <p className="text-sm text-gray-600 mt-1">
                  {item.keySignals.join(', ')}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600">{item.distressScore}</p>
                </div>
                <RiskBadge level={item.riskLevel} size="sm" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </DashboardLayout>
  );
}
