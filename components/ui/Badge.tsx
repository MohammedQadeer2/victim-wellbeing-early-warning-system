// Badge components for status, risk level, and trend indicators
// Provides consistent visual language for system states

import React from 'react';
import { RiskLevel, TrendDirection } from '@/types';
import { getRiskColor, getTrendColor, getTrendIcon } from '@/utils/formatting';

// Generic Badge component
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Badge({ 
  children, 
  variant = 'default',
  size = 'md',
  className = '' 
}: BadgeProps) {
  // Variant styles
  const variantStyles = {
    default: 'bg-gray-100 text-gray-800 border-gray-300',
    success: 'bg-green-100 text-green-800 border-green-300',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    danger: 'bg-red-100 text-red-800 border-red-300',
    info: 'bg-blue-100 text-blue-800 border-blue-300',
  };
  
  // Size styles
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };
  
  const badgeClasses = [
    'inline-flex items-center font-medium rounded-md border',
    variantStyles[variant],
    sizeStyles[size],
    className,
  ].join(' ');
  
  return (
    <span className={badgeClasses}>
      {children}
    </span>
  );
}

// Risk Level Badge
// Displays risk level with appropriate color coding
interface RiskBadgeProps {
  level: RiskLevel;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export function RiskBadge({ level, size = 'md', showIcon = true }: RiskBadgeProps) {
  const colorClass = getRiskColor(level);
  
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  };
  
  return (
    <span className={`inline-flex items-center font-semibold rounded-md border ${colorClass} ${sizeStyles[size]}`}>
      {showIcon && <span className="mr-1">●</span>}
      {level}
    </span>
  );
}

// Trend Badge
// Displays trend direction with icon and color
interface TrendBadgeProps {
  trend: TrendDirection;
  size?: 'sm' | 'md' | 'lg';
}

export function TrendBadge({ trend, size = 'md' }: TrendBadgeProps) {
  const colorClass = getTrendColor(trend);
  const icon = getTrendIcon(trend);
  
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };
  
  return (
    <span className={`inline-flex items-center font-medium rounded-md ${colorClass} ${sizeStyles[size]}`}>
      <span className="mr-1 font-bold">{icon}</span>
      {trend}
    </span>
  );
}

// Status Badge for alerts, interventions, etc.
interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md' | 'lg';
}

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  // Map status to variants
  const getVariant = (status: string) => {
    const lower = status.toLowerCase();
    if (lower.includes('completed') || lower.includes('resolved')) return 'success';
    if (lower.includes('progress') || lower.includes('review')) return 'info';
    if (lower.includes('pending') || lower.includes('planned')) return 'warning';
    if (lower.includes('cancelled') || lower.includes('dismissed')) return 'default';
    return 'default';
  };
  
  return <Badge variant={getVariant(status)} size={size}>{status}</Badge>;
}
