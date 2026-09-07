// Reusable Card component
// Provides consistent card styling for content containers

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: boolean;
}

export function Card({ 
  children, 
  className = '', 
  padding = 'md',
  shadow = true,
}: CardProps) {
  // Padding options
  const paddingStyles = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-4 sm:p-6',
    lg: 'p-6 sm:p-8',
  };
  
  // Combine styles
  const cardClasses = [
    'bg-white rounded-lg border border-gray-200',
    shadow ? 'card-shadow' : '',
    paddingStyles[padding],
    className,
  ].join(' ');
  
  return (
    <div className={cardClasses}>
      {children}
    </div>
  );
}

// Card header component for consistent card titles
export function CardHeader({ 
  title, 
  subtitle, 
  action,
}: { 
  title: string; 
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-4 sm:mb-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-1 text-sm sm:text-base text-gray-600">
              {subtitle}
            </p>
          )}
        </div>
        {action && <div className="ml-4">{action}</div>}
      </div>
    </div>
  );
}
