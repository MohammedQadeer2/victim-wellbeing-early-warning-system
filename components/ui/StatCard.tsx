// Stat Card component for dashboard metrics
// Displays key statistics with optional trend indicators

import React from 'react';
import { Card } from './Card';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    direction: 'up' | 'down' | 'neutral';
    positive?: boolean;
  };
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'gray';
  onClick?: () => void;
}

export function StatCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  color = 'blue',
  onClick,
}: StatCardProps) {
  // Color variants for the stat value
  const colorStyles = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    yellow: 'text-yellow-600',
    red: 'text-red-600',
    gray: 'text-gray-600',
  };
  
  // Trend color based on direction and whether it's positive
  const getTrendColor = () => {
    if (!trend) return '';
    
    if (trend.direction === 'up') {
      return trend.positive ? 'text-green-600' : 'text-red-600';
    }
    if (trend.direction === 'down') {
      return trend.positive ? 'text-green-600' : 'text-red-600';
    }
    return 'text-gray-600';
  };
  
  return (
    <Card 
      className={onClick ? 'cursor-pointer hover:shadow-lg transition-smooth' : ''}
      shadow={true}
    >
      <div onClick={onClick} className="h-full">
        {/* Header with title and icon */}
        <div className="flex items-start justify-between mb-3">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          {icon && (
            <div className={`${colorStyles[color]} opacity-80`}>
              {icon}
            </div>
          )}
        </div>
        
        {/* Main value */}
        <div className="mb-2">
          <p className={`text-3xl sm:text-4xl font-bold ${colorStyles[color]}`}>
            {value}
          </p>
        </div>
        
        {/* Subtitle and trend */}
        <div className="flex items-center justify-between text-sm">
          {subtitle && (
            <p className="text-gray-500">{subtitle}</p>
          )}
          {trend && (
            <div className={`flex items-center font-medium ${getTrendColor()}`}>
              {trend.direction === 'up' && <span className="mr-1">↑</span>}
              {trend.direction === 'down' && <span className="mr-1">↓</span>}
              {trend.direction === 'neutral' && <span className="mr-1">→</span>}
              {trend.value}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
