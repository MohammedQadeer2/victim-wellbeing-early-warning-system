// Alert and notification types
// System-generated alerts for counsellors and authorities

import { RiskLevel } from './victim';

export interface Alert {
  id: string;
  victimId: string;
  caseId: string;
  type: AlertType;
  severity: AlertSeverity;
  title: string;
  description: string;
  reason: string[];
  triggeredAt: string;
  triggeredBy: string; // 'AI' or user ID
  status: AlertStatus;
  assignedTo?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  actionTaken?: string;
  resolution?: string;
  metadata: AlertMetadata;
}

// Types of alerts the system can generate
export type AlertType =
  | 'HIGH_RISK'
  | 'ESCALATING_DISTRESS'
  | 'SAFETY_CONCERN'
  | 'MISSED_CHECKIN'
  | 'THREAT_DETECTED'
  | 'CRITICAL_SIGNAL'
  | 'COURT_DATE_APPROACHING'
  | 'INTERVENTION_NEEDED';

// Alert severity levels
export type AlertSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

// Alert processing status
export type AlertStatus =
  | 'NEW'
  | 'ACKNOWLEDGED'
  | 'IN_REVIEW'
  | 'ACTION_TAKEN'
  | 'RESOLVED'
  | 'DISMISSED';

// Additional alert metadata
export interface AlertMetadata {
  distressScore: number;
  riskLevel: RiskLevel;
  trend: string;
  detectedSignals: string[];
  previousAlerts: number;
  escalationRisk: string;
}

// Notification to users
export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  priority: 'LOW' | 'NORMAL' | 'HIGH';
}

// Types of notifications
export type NotificationType =
  | 'ALERT'
  | 'CHECKIN_DUE'
  | 'INTERVENTION_SCHEDULED'
  | 'CASE_UPDATE'
  | 'SYSTEM_MESSAGE';
