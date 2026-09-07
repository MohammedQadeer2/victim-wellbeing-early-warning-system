// Dashboard statistics and analytics types
// Used for counsellor and authority overview screens

import { RiskLevel } from './victim';

// Statistics for counsellor dashboard
export interface CounsellorDashboardStats {
  assignedCases: number;
  highRiskCases: number;
  increasingRiskCases: number;
  pendingInterventions: number;
  unreadAlerts: number;
  checkInsToday: number;
  casesRequiringAttention: CaseRequiringAttention[];
}

// Case that needs counsellor attention
export interface CaseRequiringAttention {
  victimId: string;
  victimName: string;
  caseId: string;
  currentDistress: number;
  riskLevel: RiskLevel;
  trend: string;
  lastCheckIn: string;
  alertType?: string;
  reason: string;
}

// Statistics for authority dashboard
export interface AuthorityDashboardStats {
  totalActiveCases: number;
  lowRiskCases: number;
  moderateRiskCases: number;
  highRiskCases: number;
  criticalRiskCases: number;
  alertsToday: number;
  interventionsActive: number;
  checkInComplianceRate: number;
}

// Risk distribution data for charts
export interface RiskDistribution {
  riskLevel: RiskLevel;
  count: number;
  percentage: number;
}

// Trend data for overall system monitoring
export interface SystemTrendData {
  date: string;
  averageDistressScore: number;
  totalCheckIns: number;
  alertsGenerated: number;
  highRiskCount: number;
}

// Analytics summary for reports
export interface AnalyticsSummary {
  period: string;
  startDate: string;
  endDate: string;
  totalCases: number;
  casesMonitored: number;
  averageDistressScore: number;
  riskDistribution: RiskDistribution[];
  totalAlerts: number;
  interventionsRecorded: number;
  checkInComplianceRate: number;
  districtBreakdown: DistrictStats[];
}

// Statistics by district
export interface DistrictStats {
  district: string;
  activeCases: number;
  averageDistress: number;
  highRiskCases: number;
  alertCount: number;
}
