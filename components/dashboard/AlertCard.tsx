// Alert Card component
// Displays system alerts for counsellors and authorities

import React from 'react';
import Link from 'next/link';
import { Card } from '../ui/Card';
import { Badge, StatusBadge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Alert as AlertType } from '@/types';
import { formatDateTime } from '@/utils/formatting';

interface AlertCardProps {
  alert: AlertType;
  onAction?: (alertId: string) => void;
  showFullDetails?: boolean;
  className?: string;
}

export function AlertCard({
  alert,
  onAction,
  showFullDetails = false,
  className = '',
}: AlertCardProps) {
  // Get severity color
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'LOW':
        return 'border-l-green-500';
      case 'MEDIUM':
        return 'border-l-yellow-500';
      case 'HIGH':
        return 'border-l-orange-500';
      case 'CRITICAL':
        return 'border-l-red-500';
      default:
        return 'border-l-gray-500';
    }
  };
  
  return (
    <Card className={`border-l-4 ${getSeverityColor(alert.severity)} ${className}`}>
      {/* Alert header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {alert.title}
          </h3>
          <div className="flex flex-wrap gap-2 text-sm text-gray-600">
            <span>Victim: <strong>{alert.victimId}</strong></span>
            <span>•</span>
            <span>Case: <strong>{alert.caseId}</strong></span>
          </div>
        </div>
        <StatusBadge status={alert.status} size="sm" />
      </div>
      
      {/* Alert description */}
      <p className="text-base text-gray-700 mb-3">
        {alert.description}
      </p>
      
      {/* Alert reasons */}
      {alert.reason.length > 0 && (
        <div className="mb-3">
          <p className="text-sm font-medium text-gray-900 mb-2">Why this alert was generated:</p>
          <ul className="space-y-1">
            {alert.reason.map((reason, index) => (
              <li key={index} className="flex items-start text-sm text-gray-700">
                <span className="mr-2 text-orange-600 font-bold">→</span>
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Metadata */}
      {showFullDetails && (
        <div className="mb-3 p-3 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-gray-600">Distress Score:</span>
              <span className="ml-2 font-semibold">{alert.metadata.distressScore}</span>
            </div>
            <div>
              <span className="text-gray-600">Risk Level:</span>
              <span className="ml-2 font-semibold">{alert.metadata.riskLevel}</span>
            </div>
            <div>
              <span className="text-gray-600">Trend:</span>
              <span className="ml-2 font-semibold">{alert.metadata.trend}</span>
            </div>
            <div>
              <span className="text-gray-600">Escalation Risk:</span>
              <span className="ml-2 font-semibold">{alert.metadata.escalationRisk}</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Footer with timestamp and actions */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
        <span className="text-sm text-gray-500">
          {formatDateTime(alert.triggeredAt)}
        </span>
        
        {onAction && alert.status === 'NEW' && (
          <Button
            size="sm"
            variant="primary"
            onClick={() => onAction(alert.id)}
          >
            Review Case
          </Button>
        )}
        
        {!onAction && (
          <Link href={`/counsellor/alerts/${alert.id}`}>
            <Button size="sm" variant="secondary">
              View Details
            </Button>
          </Link>
        )}
      </div>
    </Card>
  );
}
