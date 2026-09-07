// Distress Score Display Card
// Shows current distress score with visual indicator

import React from 'react';
import { Card } from '../ui/Card';
import { RiskBadge, TrendBadge } from '../ui/Badge';
import { RiskLevel, TrendDirection } from '@/types';
import { getDistressScoreColor } from '@/utils/formatting';

interface DistressScoreCardProps {
  score: number;
  riskLevel: RiskLevel;
  trend: TrendDirection;
  lastUpdated: string;
  className?: string;
}

export function DistressScoreCard({
  score,
  riskLevel,
  trend,
  lastUpdated,
  className = '',
}: DistressScoreCardProps) {
  return (
    <Card className={className}>
      {/* Header */}
      <h3 className="text-base font-medium text-gray-600 mb-4">
        Current Distress Score
      </h3>
      
      {/* Main score display */}
      <div className="mb-4">
        <div className="flex items-baseline space-x-2">
          <span className={`text-5xl sm:text-6xl font-bold ${getDistressScoreColor(score)}`}>
            {score}
          </span>
          <span className="text-2xl text-gray-400">/ 100</span>
        </div>
      </div>
      
      {/* Risk level and trend */}
      <div className="flex flex-wrap gap-2 mb-4">
        <RiskBadge level={riskLevel} size="md" />
        <TrendBadge trend={trend} size="md" />
      </div>
      
      {/* Last updated */}
      <p className="text-sm text-gray-500">
        Last updated: {lastUpdated}
      </p>
      
      {/* Scale reference */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-600 mb-2">Score Scale:</p>
        <div className="flex justify-between text-xs">
          <div className="text-center">
            <div className="w-12 h-2 bg-green-500 rounded mb-1"></div>
            <span className="text-gray-600">0-30</span>
          </div>
          <div className="text-center">
            <div className="w-12 h-2 bg-yellow-500 rounded mb-1"></div>
            <span className="text-gray-600">30-70</span>
          </div>
          <div className="text-center">
            <div className="w-12 h-2 bg-orange-500 rounded mb-1"></div>
            <span className="text-gray-600">70-85</span>
          </div>
          <div className="text-center">
            <div className="w-12 h-2 bg-red-500 rounded mb-1"></div>
            <span className="text-gray-600">85-100</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
