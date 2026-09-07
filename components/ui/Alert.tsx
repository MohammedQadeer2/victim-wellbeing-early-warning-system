// Alert component for notifications and messages
// Used to display important information to users

import React from 'react';

interface AlertProps {
  type: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  message: string;
  onClose?: () => void;
  className?: string;
}

export function Alert({ type, title, message, onClose, className = '' }: AlertProps) {
  // Style variants based on alert type
  const typeStyles = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    error: 'bg-red-50 border-red-200 text-red-800',
  };
  
  // Icons for each type
  const icons = {
    info: 'ℹ️',
    success: '✓',
    warning: '⚠️',
    error: '✕',
  };
  
  return (
    <div className={`border rounded-lg p-4 ${typeStyles[type]} ${className}`} role="alert">
      <div className="flex items-start">
        {/* Icon */}
        <span className="text-xl mr-3 flex-shrink-0">
          {icons[type]}
        </span>
        
        {/* Content */}
        <div className="flex-1">
          {title && (
            <h4 className="font-semibold mb-1 text-base">
              {title}
            </h4>
          )}
          <p className="text-sm leading-relaxed">
            {message}
          </p>
        </div>
        
        {/* Close button */}
        {onClose && (
          <button
            onClick={onClose}
            className="ml-3 flex-shrink-0 text-lg hover:opacity-70 transition-smooth"
            aria-label="Close alert"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}
