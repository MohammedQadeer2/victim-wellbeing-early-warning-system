// Victim information structure
// Contains demographic and case-related information
export interface Victim {
  id: string; // Format: V-1001, V-1002, etc.
  name: string;
  age: number;
  gender: string;
  district: string;
  caseId: string;
  registrationDate: string;
  assignedCounsellor?: string;
  contactPreference: 'phone' | 'sms' | 'app';
  languagePreference: string;
}

// Victim dashboard summary data
// Aggregated information shown to the victim
export interface VictimDashboard {
  victimId: string;
  currentDistressScore: number;
  riskLevel: RiskLevel;
  trend: TrendDirection;
  lastCheckInDate: string;
  nextCheckInDue: string;
  recentSignals: string[];
  upcomingSupport?: string;
}

// Risk level classification
export type RiskLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';

// Trend direction indicators
export type TrendDirection = 'STABLE' | 'INCREASING' | 'DECREASING';
