// Signal Card component
// Displays detected risk signals from AI analysis

import React from 'react';
import { Card } from '../ui/Card';
import { RiskSignal } from '@/types';

interface SignalCardProps {
  signals: RiskSignal[];
  title?: string;
  className?: string;
}

export function SignalCard({ 
  signals, 
  title = 'Detected Signals',
  className = '' 
}: SignalCardProps) {
  // Get color for signal severity
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'LOW':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'MODERATE':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'HIGH':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'CRITICAL':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };
  
  return (
    <Card className={className}>
      {/* Header */}
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {title}
      </h3>
      
      {/* Signals list */}
      {signals.length === 0 ? (
        <p className="text-base text-gray-600">No significant signals detected.</p>
      ) : (
        <div className="space-y-3">
          {signals.map((signal, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg border ${getSeverityColor(signal.severity)}`}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-base">
                  {signal.type.replace(/_/g, ' ')}
                </h4>
                <span className="text-xs font-semibold px-2 py-0.5 rounded">
                  {signal.severity}
                </span>
              </div>
              
              <p className="text-sm mb-2">
                {signal.description}
              </p>
              
              {signal.indicators.length > 0 && (
                <ul className="text-sm space-y-1 mt-2">
                  {signal.indicators.map((indicator, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{indicator}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

// Simple signal list (for smaller displays)
export function SignalList({ signals }: { signals: string[] }) {
  if (signals.length === 0) {
    return <p className="text-sm text-gray-600">No signals detected</p>;
  }
  
  return (
    <ul className="space-y-1">
      {signals.map((signal, index) => (
        <li key={index} className="flex items-start text-sm text-gray-700">
          <span className="mr-2 text-blue-600">•</span>
          <span>{signal}</span>
        </li>
      ))}
    </ul>
  );
}
