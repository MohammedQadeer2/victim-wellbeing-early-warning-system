// Victim Detail Page for Counsellor
// Comprehensive view of victim's case with AI analysis and explainability

'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { RiskBadge, TrendBadge, StatusBadge } from '@/components/ui/Badge';
import { LoadingSpinner } from '@/components/ui/LoadingState';
import { DistressTrendChart } from '@/components/charts/DistressTrendChart';
import { SignalCard } from '@/components/dashboard/SignalCard';
import { COUNSELLOR_NAV_ITEMS, DEMO_USERS } from '@/constants';
import { getVictimDetails } from '@/services/api';
import { Victim, Case, DistressHistory, CheckIn, Alert, Intervention } from '@/types';
import { formatDate, formatDateTime } from '@/utils/formatting';

export default function VictimDetailPage() {
  const params = useParams();
  const victimId = params?.id as string;
  
  const [loading, setLoading] = useState(true);
  const [victim, setVictim] = useState<Victim | null>(null);
  const [caseData, setCaseData] = useState<Case | null>(null);
  const [distressHistory, setDistressHistory] = useState<DistressHistory[]>([]);
  const [recentCheckIns, setRecentCheckIns] = useState<CheckIn[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [interventions, setInterventions] = useState<Intervention[]>([]);
  
  useEffect(() => {
    async function loadData() {
      try {
        const data = await getVictimDetails(victimId);
        setVictim(data.victim);
        setCaseData(data.case);
        setDistressHistory(data.distressHistory);
        setRecentCheckIns(data.recentCheckIns);
        setAlerts(data.alerts);
        setInterventions(data.interventions);
      } catch (error) {
        console.error('Error loading victim details:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, [victimId]);
  
  if (loading) {
    return (
      <DashboardLayout userName={DEMO_USERS.COUNSELLOR.name} userRole="Counsellor" navItems={COUNSELLOR_NAV_ITEMS}>
        <LoadingSpinner size="lg" />
      </DashboardLayout>
    );
  }
  
  if (!victim || !caseData) {
    return (
      <DashboardLayout userName={DEMO_USERS.COUNSELLOR.name} userRole="Counsellor" navItems={COUNSELLOR_NAV_ITEMS}>
        <p className="text-center text-gray-600">Victim not found.</p>
      </DashboardLayout>
    );
  }
  
  const latestCheckIn = recentCheckIns[recentCheckIns.length - 1];
  
  return (
    <DashboardLayout userName={DEMO_USERS.COUNSELLOR.name} userRole="Counsellor" navItems={COUNSELLOR_NAV_ITEMS}>
      <PageHeader
        title={victim.name}
        description={`${victim.id} • ${caseData.id}`}
        breadcrumbs={[
          { label: 'Cases', href: '/counsellor/cases' },
          { label: victim.name },
        ]}
        action={
          <Button variant="primary">
            Contact Victim
          </Button>
        }
      />
      
      {/* Alert Banner if high risk */}
      {latestCheckIn && latestCheckIn.riskLevel === 'HIGH' && (
        <div className="mb-6">
          <Card className="bg-red-50 border-red-200">
            <div className="flex items-start">
              <span className="text-2xl mr-3">⚠️</span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">High-Risk Case</h3>
                <p className="text-base text-gray-700">
                  This victim is showing high distress levels. Immediate review and intervention may be needed.
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}
      
      {/* Victim Info & Current Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Victim Information */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Victim Information</h3>
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-gray-600">Victim ID:</span>
              <p className="font-medium text-gray-900">{victim.id}</p>
            </div>
            <div>
              <span className="text-gray-600">Age:</span>
              <p className="font-medium text-gray-900">{victim.age}</p>
            </div>
            <div>
              <span className="text-gray-600">Gender:</span>
              <p className="font-medium text-gray-900">{victim.gender}</p>
            </div>
            <div>
              <span className="text-gray-600">District:</span>
              <p className="font-medium text-gray-900">{victim.district}</p>
            </div>
            <div>
              <span className="text-gray-600">Contact Preference:</span>
              <p className="font-medium text-gray-900 capitalize">{victim.contactPreference}</p>
            </div>
            <div>
              <span className="text-gray-600">Language:</span>
              <p className="font-medium text-gray-900">{victim.languagePreference}</p>
            </div>
          </div>
        </Card>
        
        {/* Case Information */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Case Information</h3>
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-gray-600">Case ID:</span>
              <p className="font-medium text-gray-900">{caseData.id}</p>
            </div>
            <div>
              <span className="text-gray-600">Type:</span>
              <p className="font-medium text-gray-900">{caseData.caseType}</p>
            </div>
            <div>
              <span className="text-gray-600">Status:</span>
              <StatusBadge status={caseData.status} size="sm" />
            </div>
            <div>
              <span className="text-gray-600">Stage:</span>
              <p className="font-medium text-gray-900">{caseData.stage}</p>
            </div>
            <div>
              <span className="text-gray-600">Registration:</span>
              <p className="font-medium text-gray-900">{formatDate(caseData.registrationDate)}</p>
            </div>
            {caseData.nextHearingDate && (
              <div>
                <span className="text-gray-600">Next Hearing:</span>
                <p className="font-medium text-gray-900">{formatDate(caseData.nextHearingDate)}</p>
              </div>
            )}
          </div>
        </Card>
        
        {/* Current Distress Status */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Status</h3>
          {latestCheckIn ? (
            <div>
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Distress Score</p>
                <div className="flex items-baseline space-x-2">
                  <span className="text-4xl font-bold text-blue-600">
                    {latestCheckIn.distressScore}
                  </span>
                  <span className="text-xl text-gray-400">/ 100</span>
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Risk Level</p>
                  <RiskBadge level={latestCheckIn.riskLevel} />
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Trend</p>
                  <TrendBadge trend={latestCheckIn.aiAnalysis.trend} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Last Check-in</p>
                  <p className="font-medium text-gray-900">{formatDate(latestCheckIn.timestamp)}</p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-600">No check-ins recorded yet.</p>
          )}
        </Card>
      </div>
      
      {/* AI Analysis Explainability Section */}
      {latestCheckIn && (
        <Card className="mb-8 bg-gradient-to-br from-blue-50 to-indigo-50">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            🤖 Why Was This Case Flagged?
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            AI-generated explanation based on the latest check-in analysis
          </p>
          <div className="bg-white rounded-lg p-4 mb-4">
            <h4 className="font-semibold text-gray-900 mb-3">Risk Assessment Factors:</h4>
            <ul className="space-y-2">
              {latestCheckIn.aiAnalysis.explanation.map((exp, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-600 mr-3 font-bold">→</span>
                  <span className="text-base text-gray-700">{exp}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Recommended Actions:</h4>
            <ul className="space-y-2">
              {latestCheckIn.aiAnalysis.recommendedActions.map((action, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-600 mr-3">✓</span>
                  <span className="text-base text-gray-700">{action}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-xs text-gray-600 mt-4 italic">
            Confidence Level: {(latestCheckIn.aiAnalysis.confidence * 100).toFixed(0)}%
          </p>
        </Card>
      )}
      
      {/* Detected Signals */}
      {latestCheckIn && (
        <div className="mb-8">
          <SignalCard
            signals={latestCheckIn.aiAnalysis.detectedSignals}
            title="Currently Detected Signals"
          />
        </div>
      )}
      
      {/* Distress Trend */}
      <Card className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Distress Trend Analysis
        </h2>
        <DistressTrendChart data={distressHistory} height={350} />
      </Card>
      
      {/* Interventions */}
      <Card className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Interventions ({interventions.length})
          </h2>
          <Button variant="primary" size="sm">
            + New Intervention
          </Button>
        </div>
        {interventions.length === 0 ? (
          <p className="text-sm text-gray-600">No interventions recorded yet.</p>
        ) : (
          <div className="space-y-3">
            {interventions.map((intervention) => (
              <div key={intervention.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{intervention.title}</h4>
                  <StatusBadge status={intervention.status} size="sm" />
                </div>
                <p className="text-sm text-gray-600 mb-2">{intervention.description}</p>
                <p className="text-xs text-gray-500">
                  {formatDateTime(intervention.initiatedAt)}
                </p>
              </div>
            ))}
          </div>
        )}
      </Card>
      
      {/* Recent Alerts */}
      {alerts.length > 0 && (
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Recent Alerts ({alerts.length})
          </h2>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{alert.title}</h4>
                  <StatusBadge status={alert.status} size="sm" />
                </div>
                <p className="text-sm text-gray-700 mb-2">{alert.description}</p>
                <p className="text-xs text-gray-500">{formatDateTime(alert.triggeredAt)}</p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </DashboardLayout>
  );
}
