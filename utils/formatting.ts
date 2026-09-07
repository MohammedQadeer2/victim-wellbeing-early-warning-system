// Utility functions for formatting data display

import { RiskLevel, TrendDirection } from '@/types';

// Format date to readable string
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

// Format date with time
export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// Format relative time (e.g., "2 days ago")
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  
  if (diffDays > 0) {
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  } else if (diffHours > 0) {
    return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  } else if (diffMins > 0) {
    return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  } else {
    return 'Just now';
  }
}

// Get color class for risk level
export function getRiskColor(riskLevel: RiskLevel): string {
  switch (riskLevel) {
    case 'LOW':
      return 'text-green-600 bg-green-50 border-green-200';
    case 'MODERATE':
      return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    case 'HIGH':
      return 'text-orange-600 bg-orange-50 border-orange-200';
    case 'CRITICAL':
      return 'text-red-600 bg-red-50 border-red-200';
    default:
      return 'text-gray-600 bg-gray-50 border-gray-200';
  }
}

// Get color class for trend direction
export function getTrendColor(trend: TrendDirection): string {
  switch (trend) {
    case 'INCREASING':
      return 'text-red-600 bg-red-50';
    case 'DECREASING':
      return 'text-green-600 bg-green-50';
    case 'STABLE':
      return 'text-blue-600 bg-blue-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
}

// Get icon for trend direction
export function getTrendIcon(trend: TrendDirection): string {
  switch (trend) {
    case 'INCREASING':
      return '↑';
    case 'DECREASING':
      return '↓';
    case 'STABLE':
      return '→';
    default:
      return '→';
  }
}

// Format distress score with color
export function getDistressScoreColor(score: number): string {
  if (score < 30) return 'text-green-600';
  if (score < 50) return 'text-blue-600';
  if (score < 70) return 'text-yellow-600';
  if (score < 85) return 'text-orange-600';
  return 'text-red-600';
}

// Calculate percentage
export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}

// Truncate text with ellipsis
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}
