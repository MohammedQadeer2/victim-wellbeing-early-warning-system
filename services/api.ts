// Frontend service layer for API calls
// Currently returns mock data
// Later these functions will call the Node.js backend API

import {
  VictimDashboard,
  CheckIn,
  DistressHistory,
  Alert,
  Intervention,
  CounsellorDashboardStats,
  AuthorityDashboardStats,
  RiskDistribution,
  SystemTrendData,
  AnalyticsSummary,
  Victim,
  Case,
  SupportService,
  Notification,
} from '@/types';

import {
  mockVictims,
  mockVictimDashboard,
  mockCases,
  mockCheckIns,
  mockDistressHistory,
  checkInQuestions,
  mockAlerts,
  mockNotifications,
  mockCounsellorDashboard,
  mockAuthorityDashboard,
  mockRiskDistribution,
  mockSystemTrend,
  mockAnalyticsSummary,
  mockInterventions,
  mockSupportServices,
} from '@/data';

// Simulate API delay for realistic demo experience
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// ============================================================================
// VICTIM SERVICES
// ============================================================================

// Get victim dashboard data
// Later: GET /api/victim/:victimId/dashboard
export async function getVictimDashboard(victimId: string): Promise<VictimDashboard> {
  await delay(500);
  return mockVictimDashboard;
}

// Get victim's distress history for trend visualization
// Later: GET /api/victim/:victimId/distress-history
export async function getVictimDistressHistory(victimId: string): Promise<DistressHistory[]> {
  await delay(500);
  return mockDistressHistory;
}

// Get victim's check-in history
// Later: GET /api/victim/:victimId/checkins
export async function getVictimCheckIns(victimId: string): Promise<CheckIn[]> {
  await delay(500);
  return mockCheckIns.filter(c => c.victimId === victimId);
}

// Get check-in questions
// Later: GET /api/checkin/questions
export async function getCheckInQuestions() {
  await delay(300);
  return checkInQuestions;
}

// Submit a check-in
// Later: POST /api/checkin
export async function submitCheckIn(checkInData: any): Promise<CheckIn> {
  await delay(1000); // Simulate AI processing time
  
  // Simulate AI analysis result
  // In production, backend will call AI service and return analysis
  return {
    id: 'CHK-NEW',
    victimId: checkInData.victimId,
    timestamp: new Date().toISOString(),
    responses: checkInData.responses,
    textResponse: checkInData.textResponse,
    distressScore: 65, // Simulated score
    riskLevel: 'MODERATE',
    aiAnalysis: {
      distressScore: 65,
      riskLevel: 'MODERATE',
      detectedSignals: [
        {
          type: 'EMOTIONAL_DISTRESS',
          severity: 'MODERATE',
          description: 'Moderate emotional distress detected',
          indicators: ['Stress indicators present'],
        },
      ],
      trend: 'STABLE',
      escalationRisk: {
        level: 'LOW',
        probability: 0.3,
        timeframe: 'within 14 days',
        factors: ['Current distress manageable'],
      },
      explanation: ['Check-in analysis complete'],
      recommendedActions: ['Continue regular check-ins'],
      confidence: 0.85,
    },
    status: 'ANALYZED',
  };
}

// Get support services
// Later: GET /api/support/services
export async function getSupportServices(): Promise<SupportService[]> {
  await delay(400);
  return mockSupportServices;
}

// ============================================================================
// COUNSELLOR SERVICES
// ============================================================================

// Get counsellor dashboard stats
// Later: GET /api/counsellor/:counsellorId/dashboard
export async function getCounsellorDashboard(counsellorId: string): Promise<CounsellorDashboardStats> {
  await delay(500);
  return mockCounsellorDashboard;
}

// Get counsellor's assigned cases
// Later: GET /api/counsellor/:counsellorId/cases
export async function getCounsellorCases(counsellorId: string): Promise<Victim[]> {
  await delay(500);
  return mockVictims.filter(v => v.assignedCounsellor === counsellorId);
}

// Get victim details for counsellor
// Later: GET /api/counsellor/victim/:victimId
export async function getVictimDetails(victimId: string): Promise<{
  victim: Victim;
  case: Case;
  distressHistory: DistressHistory[];
  recentCheckIns: CheckIn[];
  alerts: Alert[];
  interventions: Intervention[];
}> {
  await delay(600);
  
  const victim = mockVictims.find(v => v.id === victimId);
  const caseData = mockCases.find(c => c.victimId === victimId);
  
  if (!victim || !caseData) {
    throw new Error('Victim not found');
  }
  
  return {
    victim,
    case: caseData,
    distressHistory: mockDistressHistory,
    recentCheckIns: mockCheckIns.filter(c => c.victimId === victimId),
    alerts: mockAlerts.filter(a => a.victimId === victimId),
    interventions: mockInterventions.filter(i => i.victimId === victimId),
  };
}

// Get high-risk alerts
// Later: GET /api/counsellor/alerts
export async function getHighRiskAlerts(counsellorId?: string): Promise<Alert[]> {
  await delay(500);
  return mockAlerts.filter(a => a.severity === 'HIGH' || a.severity === 'CRITICAL');
}

// Get all alerts
// Later: GET /api/alerts
export async function getAllAlerts(): Promise<Alert[]> {
  await delay(500);
  return mockAlerts;
}

// Update alert status
// Later: PATCH /api/alert/:alertId
export async function updateAlertStatus(alertId: string, status: string, notes?: string): Promise<Alert> {
  await delay(400);
  const alert = mockAlerts.find(a => a.id === alertId);
  if (!alert) throw new Error('Alert not found');
  return { ...alert, status: status as any };
}

// Get interventions
// Later: GET /api/interventions
export async function getInterventions(victimId?: string): Promise<Intervention[]> {
  await delay(500);
  if (victimId) {
    return mockInterventions.filter(i => i.victimId === victimId);
  }
  return mockInterventions;
}

// Create intervention
// Later: POST /api/intervention
export async function createIntervention(interventionData: any): Promise<Intervention> {
  await delay(400);
  return {
    id: 'INT-NEW',
    ...interventionData,
    initiatedAt: new Date().toISOString(),
    status: 'PLANNED',
    notes: [],
    followUpRequired: false,
  };
}

// ============================================================================
// AUTHORITY SERVICES
// ============================================================================

// Get authority dashboard stats
// Later: GET /api/authority/dashboard
export async function getAuthorityDashboard(): Promise<AuthorityDashboardStats> {
  await delay(500);
  return mockAuthorityDashboard;
}

// Get risk distribution
// Later: GET /api/authority/risk-distribution
export async function getRiskDistribution(): Promise<RiskDistribution[]> {
  await delay(400);
  return mockRiskDistribution;
}

// Get system trend data
// Later: GET /api/authority/trends
export async function getSystemTrends(): Promise<SystemTrendData[]> {
  await delay(500);
  return mockSystemTrend;
}

// Get analytics summary
// Later: GET /api/authority/analytics
export async function getAnalyticsSummary(period?: string): Promise<AnalyticsSummary> {
  await delay(600);
  return mockAnalyticsSummary;
}

// Get all cases
// Later: GET /api/cases
export async function getAllCases(): Promise<Case[]> {
  await delay(500);
  return mockCases;
}

// Get high-risk cases
// Later: GET /api/cases/high-risk
export async function getHighRiskCases(): Promise<{
  victim: Victim;
  case: Case;
  distressScore: number;
  riskLevel: string;
  trend: string;
}[]> {
  await delay(500);
  
  // Combine victim and case data with risk information
  return mockVictims
    .filter(v => {
      // Get latest check-in for this victim
      const checkIns = mockCheckIns.filter(c => c.victimId === v.id);
      const latest = checkIns[checkIns.length - 1];
      return latest && (latest.riskLevel === 'HIGH' || latest.riskLevel === 'CRITICAL');
    })
    .map(v => {
      const caseData = mockCases.find(c => c.victimId === v.id);
      const checkIns = mockCheckIns.filter(c => c.victimId === v.id);
      const latest = checkIns[checkIns.length - 1];
      
      return {
        victim: v,
        case: caseData!,
        distressScore: latest?.distressScore || 0,
        riskLevel: latest?.riskLevel || 'MODERATE',
        trend: latest?.aiAnalysis.trend || 'STABLE',
      };
    });
}

// ============================================================================
// NOTIFICATION SERVICES
// ============================================================================

// Get user notifications
// Later: GET /api/notifications/:userId
export async function getUserNotifications(userId: string): Promise<Notification[]> {
  await delay(400);
  return mockNotifications.filter(n => n.userId === userId);
}

// Mark notification as read
// Later: PATCH /api/notification/:notificationId/read
export async function markNotificationRead(notificationId: string): Promise<void> {
  await delay(200);
  // Update would happen in backend
}
