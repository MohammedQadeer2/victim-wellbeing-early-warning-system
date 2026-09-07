// Counsellor Interventions Page
// Manage and track interventions

'use client';

import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/Badge';
import { LoadingSpinner } from '@/components/ui/LoadingState';
import { COUNSELLOR_NAV_ITEMS, DEMO_USERS } from '@/constants';
import { getInterventions } from '@/services/api';
import { Intervention } from '@/types';
import { formatDate } from '@/utils/formatting';

export default function InterventionsPage() {
  const [loading, setLoading] = useState(true);
  const [interventions, setInterventions] = useState<Intervention[]>([]);
  const [filter, setFilter] = useState<'all' | 'planned' | 'in_progress' | 'completed'>('all');
  
  useEffect(() => {
    async function loadData() {
      try {
        const data = await getInterventions();
        setInterventions(data);
      } catch (error) {
        console.error('Error loading interventions:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, []);
  
  const filteredInterventions = interventions.filter(int => {
    if (filter === 'all') return true;
    return int.status.toLowerCase().replace('_', '') === filter.replace('_', '');
  });
  
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
        title="Interventions"
        description="Track and manage support interventions"
        action={
          <Button variant="primary">
            + New Intervention
          </Button>
        }
      />
      
      {/* Filter Tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-smooth ${
            filter === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All ({interventions.length})
        </button>
        <button
          onClick={() => setFilter('planned')}
          className={`px-4 py-2 rounded-lg font-medium transition-smooth ${
            filter === 'planned'
              ? 'bg-yellow-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Planned
        </button>
        <button
          onClick={() => setFilter('in_progress')}
          className={`px-4 py-2 rounded-lg font-medium transition-smooth ${
            filter === 'in_progress'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          In Progress
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-4 py-2 rounded-lg font-medium transition-smooth ${
            filter === 'completed'
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Completed
        </button>
      </div>
      
      {/* Interventions List */}
      <div className="space-y-4">
        {filteredInterventions.map((intervention) => (
          <Card key={intervention.id}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {intervention.title}
                  </h3>
                  <StatusBadge status={intervention.status} />
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  Victim: <strong>{intervention.victimId}</strong> • Case: <strong>{intervention.caseId}</strong>
                </p>
                <p className="text-base text-gray-700">{intervention.description}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                intervention.priority === 'URGENT' ? 'bg-red-100 text-red-800' :
                intervention.priority === 'HIGH' ? 'bg-orange-100 text-orange-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {intervention.priority}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
              <div>
                <span className="text-gray-600">Type:</span>
                <p className="font-medium text-gray-900">{intervention.type.replace(/_/g, ' ')}</p>
              </div>
              <div>
                <span className="text-gray-600">Initiated:</span>
                <p className="font-medium text-gray-900">{formatDate(intervention.initiatedAt)}</p>
              </div>
              {intervention.scheduledDate && (
                <div>
                  <span className="text-gray-600">Scheduled:</span>
                  <p className="font-medium text-gray-900">{formatDate(intervention.scheduledDate)}</p>
                </div>
              )}
            </div>
            
            {intervention.notes.length > 0 && (
              <div className="pt-4 border-t border-gray-200 mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Latest Note:</h4>
                <p className="text-sm text-gray-700">{intervention.notes[intervention.notes.length - 1].note}</p>
              </div>
            )}
            
            <div className="flex gap-2">
              <Button variant="primary" size="sm">
                View Details
              </Button>
              <Button variant="secondary" size="sm">
                Add Note
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
