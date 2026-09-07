// Counsellor Notifications Page
// View system notifications and updates

'use client';

import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { LoadingSpinner } from '@/components/ui/LoadingState';
import { EmptyState } from '@/components/ui/EmptyState';
import { COUNSELLOR_NAV_ITEMS, DEMO_USERS } from '@/constants';
import { getUserNotifications } from '@/services/api';
import { Notification } from '@/types';
import { formatDateTime } from '@/utils/formatting';

export default function NotificationsPage() {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  useEffect(() => {
    async function loadData() {
      try {
        const data = await getUserNotifications(DEMO_USERS.COUNSELLOR.id);
        setNotifications(data);
      } catch (error) {
        console.error('Error loading notifications:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, []);
  
  if (loading) {
    return (
      <DashboardLayout userName={DEMO_USERS.COUNSELLOR.name} userRole="Counsellor" navItems={COUNSELLOR_NAV_ITEMS}>
        <LoadingSpinner size="lg" />
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout userName={DEMO_USERS.COUNSELLOR.name} userRole="Counsellor" navItems={COUNSELLOR_NAV_ITEMS}>
      <PageHeader
        title="Notifications"
        description="System notifications and updates"
      />
      
      {notifications.length === 0 ? (
        <EmptyState
          title="No notifications"
          description="You're all caught up! Check back later for new updates."
        />
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card
              key={notification.id}
              className={notification.read ? 'bg-white' : 'bg-blue-50 border-blue-200'}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900">
                      {notification.title}
                    </h3>
                    {!notification.read && (
                      <span className="w-2 h-2 bg-blue-600 rounded-full" />
                    )}
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      notification.priority === 'HIGH' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {notification.priority}
                    </span>
                  </div>
                  <p className="text-base text-gray-700 mb-2">{notification.message}</p>
                  <p className="text-sm text-gray-500">{formatDateTime(notification.timestamp)}</p>
                </div>
                {notification.actionUrl && (
                  <button className="ml-4 text-blue-600 hover:text-blue-700 font-medium text-sm">
                    View →
                  </button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
