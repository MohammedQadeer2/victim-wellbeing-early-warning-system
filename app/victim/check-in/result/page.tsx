// Check-in Result Page
// Displays AI analysis results after completing check-in

'use client';

import React from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { RiskBadge, TrendBadge } from '@/components/ui/Badge';
import { SignalCard } from '@/components/dashboard/SignalCard';
import { VICTIM_NAV_ITEMS, DEMO_USERS } from '@/constants';

export default function CheckInResultPage() {
  // In a real app, this would come from the submission
  // For demo, showing a sample result
  const result = {
    distressScore: 65,
    riskLevel: 'MODERATE' as const,
    trend: 'STABLE' as const,
    detectedSignals: [
      {
        type: 'EMOTIONAL_DISTRESS' as const,
        severity: 'MODERATE' as const,
        description: 'Moderate emotional distress detected',
        indicators: ['Stress indicators present', 'Some difficulty managing emotions'],
      },
      {
        type: 'COURT_ANXIETY' as const,
        severity: 'LOW' as const,
        description: 'Mild anxiety related to legal proceedings',
        indicators: ['Concern about upcoming hearings'],
      },
    ],
    recommendations: [
      'Continue with regular check-ins',
      'Consider scheduling a counselling session if stress increases',
      'Practice stress management techniques',
      'Reach out if you need immediate support',
    ],
  };
  
  return (
    <DashboardLayout
      userName={DEMO_USERS.VICTIM.name}
      userRole="Victim"
      navItems={VICTIM_NAV_ITEMS}
    >
      <PageHeader
        title="Check-in Complete"
        description="Thank you for completing your check-in. Here's what we found."
      />
      
      {/* Success message */}
      <div className="mb-6">
        <Card className="bg-green-50 border-green-200">
          <div className="flex items-start">
            <span className="text-2xl mr-3">✓</span>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                Your check-in has been recorded
              </h3>
              <p className="text-base text-gray-700">
                Your responses have been analyzed to help us understand your current well-being.
              </p>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Analysis Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Distress Score */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Current Distress Score
          </h3>
          <div className="mb-4">
            <div className="flex items-baseline space-x-2">
              <span className="text-5xl font-bold text-blue-600">
                {result.distressScore}
              </span>
              <span className="text-2xl text-gray-400">/ 100</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            <RiskBadge level={result.riskLevel} size="md" />
            <TrendBadge trend={result.trend} size="md" />
          </div>
          <p className="text-sm text-gray-600">
            This score represents your current level of distress based on your responses.
          </p>
        </Card>
        
        {/* Interpretation */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            What This Means
          </h3>
          {/* Using curly quotes ' ' instead of straight quotes to avoid JSX escape issues */}
          <p className="text-base text-gray-700 mb-4 leading-relaxed">
            Your responses suggest that you&apos;re experiencing moderate stress. This is common during legal proceedings, but we&apos;re here to support you.
          </p>
          <p className="text-base text-gray-700 leading-relaxed">
            We recommend continuing with regular check-ins and reaching out if your distress increases or if you need additional support.
          </p>
        </Card>
      </div>
      
      {/* Detected Signals */}
      <div className="mb-8">
        <SignalCard
          signals={result.detectedSignals}
          title="Signals Detected from Your Responses"
        />
      </div>
      
      {/* Recommendations */}
      <Card className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Recommended Next Steps
        </h3>
        <ul className="space-y-3">
          {result.recommendations.map((rec, index) => (
            <li key={index} className="flex items-start">
              <span className="text-blue-600 mr-3 font-bold text-lg">→</span>
              <span className="text-base text-gray-700">{rec}</span>
            </li>
          ))}
        </ul>
      </Card>
      
      {/* Support CTA */}
      <Card className="bg-blue-50 border-blue-200 mb-8">
        <div className="text-center py-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Need Additional Support?
          </h3>
          {/* Using &apos; to escape apostrophes in JSX strings */}
          <p className="text-base text-gray-700 mb-6 max-w-2xl mx-auto">
            If you&apos;re experiencing distress or need someone to talk to, our support services are available.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/victim/support">
              <Button variant="primary" size="lg">
                View Support Services
              </Button>
            </Link>
            <Link href="/victim/assistant">
              <Button variant="secondary" size="lg">
                Talk to AI Assistant
              </Button>
            </Link>
          </div>
        </div>
      </Card>
      
      {/* Navigation */}
      <div className="flex justify-center">
        <Link href="/victim">
          <Button variant="secondary" size="lg">
            Return to Dashboard
          </Button>
        </Link>
      </div>
      
      {/* Important Notice */}
      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        {/* Using &apos; to escape apostrophes - this prevents JSX parsing errors */}
        <p className="text-sm text-gray-700">
          <strong>Important:</strong> These results are generated by an AI system to assist support personnel. They are not a medical diagnosis. If you&apos;re experiencing a crisis or emergency, please contact emergency services immediately.
        </p>
      </div>
    </DashboardLayout>
  );
}
