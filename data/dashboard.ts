// Mock dashboard statistics and analytics
// Used for counsellor and authority overview screens

import { 
  CounsellorDashboardStats, 
  AuthorityDashboardStats,
  RiskDistribution,
  SystemTrendData,
  AnalyticsSummary,
  CaseRequiringAttention 
} from '@/types';

// Counsellor dashboard statistics
export const mockCounsellorDashboard: CounsellorDashboardStats = {
  assignedCases: 12,
  highRiskCases: 3,
  increasingRiskCases: 5,
  pendingInterventions: 4,
  unreadAlerts: 2,
  checkInsToday: 3,
  casesRequiringAttention: [
    {
      victimId: 'V-1001',
      victimName: 'Anonymous Victim 1001',
      caseId: 'CASE-2026-001',
      currentDistress: 82,
      riskLevel: 'HIGH',
      trend: 'INCREASING',
      lastCheckIn: '2026-09-05',
      alertType: 'HIGH_RISK',
      reason: 'Active threat situation with severe fear and safety concerns',
    },
    {
      victimId: 'V-1002',
      victimName: 'Anonymous Victim 1002',
      caseId: 'CASE-2026-002',
      currentDistress: 72,
      riskLevel: 'HIGH',
      trend: 'INCREASING',
      lastCheckIn: '2026-09-03',
      alertType: 'SAFETY_CONCERN',
      reason: 'Safety concerns flagged, protection services involved',
    },
    {
      victimId: 'V-1003',
      victimName: 'Anonymous Victim 1003',
      caseId: 'CASE-2026-003',
      currentDistress: 62,
      riskLevel: 'MODERATE',
      trend: 'INCREASING',
      lastCheckIn: '2026-09-04',
      alertType: 'ESCALATING_DISTRESS',
      reason: 'Consistent upward distress trend over past 6 weeks',
    },
  ],
};

// Authority dashboard statistics
export const mockAuthorityDashboard: AuthorityDashboardStats = {
  totalActiveCases: 48,
  lowRiskCases: 18,
  moderateRiskCases: 20,
  highRiskCases: 8,
  criticalRiskCases: 2,
  alertsToday: 5,
  interventionsActive: 12,
  checkInComplianceRate: 87,
};

// Risk distribution data for charts
export const mockRiskDistribution: RiskDistribution[] = [
  {
    riskLevel: 'LOW',
    count: 18,
    percentage: 37.5,
  },
  {
    riskLevel: 'MODERATE',
    count: 20,
    percentage: 41.7,
  },
  {
    riskLevel: 'HIGH',
    count: 8,
    percentage: 16.7,
  },
  {
    riskLevel: 'CRITICAL',
    count: 2,
    percentage: 4.1,
  },
];

// System trend data over time
export const mockSystemTrend: SystemTrendData[] = [
  {
    date: '2026-08-01',
    averageDistressScore: 38,
    totalCheckIns: 42,
    alertsGenerated: 3,
    highRiskCount: 5,
  },
  {
    date: '2026-08-08',
    averageDistressScore: 41,
    totalCheckIns: 45,
    alertsGenerated: 4,
    highRiskCount: 6,
  },
  {
    date: '2026-08-15',
    averageDistressScore: 43,
    totalCheckIns: 48,
    alertsGenerated: 5,
    highRiskCount: 7,
  },
  {
    date: '2026-08-22',
    averageDistressScore: 45,
    totalCheckIns: 46,
    alertsGenerated: 6,
    highRiskCount: 7,
  },
  {
    date: '2026-08-29',
    averageDistressScore: 47,
    totalCheckIns: 44,
    alertsGenerated: 5,
    highRiskCount: 8,
  },
  {
    date: '2026-09-05',
    averageDistressScore: 49,
    totalCheckIns: 43,
    alertsGenerated: 7,
    highRiskCount: 10,
  },
];

// Analytics summary for reports
export const mockAnalyticsSummary: AnalyticsSummary = {
  period: 'August 2026',
  startDate: '2026-08-01',
  endDate: '2026-08-31',
  totalCases: 48,
  casesMonitored: 45,
  averageDistressScore: 43,
  riskDistribution: mockRiskDistribution,
  totalAlerts: 22,
  interventionsRecorded: 18,
  checkInComplianceRate: 89,
  districtBreakdown: [
    {
      district: 'District A',
      activeCases: 18,
      averageDistress: 45,
      highRiskCases: 4,
      alertCount: 9,
    },
    {
      district: 'District B',
      activeCases: 16,
      averageDistress: 42,
      highRiskCases: 3,
      alertCount: 7,
    },
    {
      district: 'District C',
      activeCases: 14,
      averageDistress: 41,
      highRiskCases: 3,
      alertCount: 6,
    },
  ],
};
