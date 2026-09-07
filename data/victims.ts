// Mock victim data for prototype demonstration
// This data will later be replaced by backend API calls

import { Victim, VictimDashboard } from '@/types';

// Sample victims with different risk profiles
export const mockVictims: Victim[] = [
  {
    id: 'V-1001',
    name: 'Anonymous Victim 1001',
    age: 28,
    gender: 'Female',
    district: 'District A',
    caseId: 'CASE-2026-001',
    registrationDate: '2026-01-15',
    assignedCounsellor: 'C-101',
    contactPreference: 'app',
    languagePreference: 'English',
  },
  {
    id: 'V-1002',
    name: 'Anonymous Victim 1002',
    age: 34,
    gender: 'Female',
    district: 'District B',
    caseId: 'CASE-2026-002',
    registrationDate: '2026-02-20',
    assignedCounsellor: 'C-101',
    contactPreference: 'sms',
    languagePreference: 'Hindi',
  },
  {
    id: 'V-1003',
    name: 'Anonymous Victim 1003',
    age: 22,
    gender: 'Female',
    district: 'District A',
    caseId: 'CASE-2026-003',
    registrationDate: '2026-03-05',
    assignedCounsellor: 'C-102',
    contactPreference: 'app',
    languagePreference: 'English',
  },
  {
    id: 'V-1004',
    name: 'Anonymous Victim 1004',
    age: 31,
    gender: 'Female',
    district: 'District C',
    caseId: 'CASE-2026-004',
    registrationDate: '2026-04-12',
    assignedCounsellor: 'C-102',
    contactPreference: 'phone',
    languagePreference: 'Tamil',
  },
  {
    id: 'V-1005',
    name: 'Anonymous Victim 1005',
    age: 26,
    gender: 'Female',
    district: 'District B',
    caseId: 'CASE-2026-005',
    registrationDate: '2026-05-18',
    assignedCounsellor: 'C-103',
    contactPreference: 'app',
    languagePreference: 'English',
  },
];

// Mock dashboard data for a specific victim
// This simulates what a victim sees on their dashboard
export const mockVictimDashboard: VictimDashboard = {
  victimId: 'V-1001',
  currentDistressScore: 58,
  riskLevel: 'MODERATE',
  trend: 'INCREASING',
  lastCheckInDate: '2026-09-05',
  nextCheckInDue: '2026-09-12',
  recentSignals: ['Sleep difficulty', 'Anxiety', 'Court-related stress'],
  upcomingSupport: 'Counselling session scheduled for Sept 10',
};
