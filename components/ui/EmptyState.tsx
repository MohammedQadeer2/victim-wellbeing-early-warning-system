// Empty State component
// Displayed when there is no data to show

import React from 'react';
import { Button } from './Button';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  title,
  description,
  icon,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="text-center py-12 px-4">
      {/* Icon */}
      {icon && (
        <div className="flex justify-center mb-4 text-gray-400">
          {icon}
        </div>
      )}
      
      {/* Title */}
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {title}
      </h3>
      
      {/* Description */}
      {description && (
        <p className="text-base text-gray-600 mb-6 max-w-md mx-auto">
          {description}
        </p>
      )}
      
      {/* Action button */}
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="primary">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
