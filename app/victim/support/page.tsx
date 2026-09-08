// Support Services Page
// Available support and assistance options

'use client';

import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingState';
import { VICTIM_NAV_ITEMS, DEMO_USERS } from '@/constants';
import { getSupportServices } from '@/services/api';
import { SupportService } from '@/types';

export default function SupportPage() {
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState<SupportService[]>([]);
  
  useEffect(() => {
    async function loadData() {
      try {
        const data = await getSupportServices();
        setServices(data);
      } catch (error) {
        console.error('Error loading support services:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, []);
  
  if (loading) {
    return (
      <DashboardLayout userName={DEMO_USERS.VICTIM.name} userRole="Victim" navItems={VICTIM_NAV_ITEMS}>
        <LoadingSpinner size="lg" />
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout userName={DEMO_USERS.VICTIM.name} userRole="Victim" navItems={VICTIM_NAV_ITEMS}>
      <PageHeader
        title="Support Services"
        description="Access various support services available to help you"
      />
      
      {/* Emergency Contact */}
      <Card className="mb-8 bg-red-50 border-red-200">
        <div className="flex items-start">
          <span className="text-3xl mr-4">🆘</span>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Emergency Support
            </h3>
            {/* Using &apos; to escape apostrophes - prevents "unescaped entity" errors */}
            <p className="text-base text-gray-700 mb-4">
              If you&apos;re in immediate danger or experiencing a crisis, please contact emergency services.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="danger" size="lg">
                Emergency: 911
              </Button>
              <Button variant="secondary" size="lg">
                Crisis Helpline: [Demo Number]
              </Button>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Support Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service) => (
          <Card key={service.id} className="hover:shadow-lg transition-smooth">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {service.name}
              </h3>
              <p className="text-base text-gray-700 leading-relaxed">
                {service.description}
              </p>
            </div>
            
            <div className="space-y-3 mb-4">
              <div>
                <p className="text-sm font-medium text-gray-900">Availability:</p>
                <p className="text-sm text-gray-600">{service.availability}</p>
              </div>
              
              {service.contactInfo && (
                <div>
                  <p className="text-sm font-medium text-gray-900">Contact:</p>
                  <p className="text-sm text-gray-600">{service.contactInfo}</p>
                </div>
              )}
              
              <div>
                <p className="text-sm font-medium text-gray-900 mb-1">Eligibility:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  {service.eligibility.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <Button variant="primary" fullWidth>
              Request This Service
            </Button>
          </Card>
        ))}
      </div>
      
      {/* Additional Help */}
      <Card className="mt-8 bg-blue-50 border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Need Help Choosing?
        </h3>
        {/* Using &apos; for apostrophes to avoid JSX escape issues */}
        <p className="text-base text-gray-700 mb-4">
          If you&apos;re not sure which service is right for you, our counsellors can help guide you to the appropriate support.
        </p>
        <Button variant="primary">
          Talk to a Counsellor
        </Button>
      </Card>
    </DashboardLayout>
  );
}
