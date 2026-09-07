// Intervention and support types
// Tracks human-led support and interventions

export interface Intervention {
  id: string;
  victimId: string;
  caseId: string;
  type: InterventionType;
  title: string;
  description: string;
  initiatedBy: string;
  initiatedAt: string;
  assignedTo?: string;
  status: InterventionStatus;
  priority: 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';
  scheduledDate?: string;
  completedDate?: string;
  notes: InterventionNote[];
  outcome?: string;
  followUpRequired: boolean;
  followUpDate?: string;
}

// Types of interventions available
export type InterventionType =
  | 'COUNSELLING'
  | 'SAFETY_ASSESSMENT'
  | 'LEGAL_ASSISTANCE'
  | 'FINANCIAL_ASSISTANCE'
  | 'REHABILITATION_SUPPORT'
  | 'PROTECTION_SERVICES'
  | 'MEDICAL_REFERRAL'
  | 'EMERGENCY_RESPONSE';

// Intervention lifecycle status
export type InterventionStatus =
  | 'RECOMMENDED'
  | 'PLANNED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'NEEDS_REVIEW'
  | 'CANCELLED';

// Notes added during intervention
export interface InterventionNote {
  id: string;
  timestamp: string;
  author: string;
  note: string;
  confidential: boolean;
}

// Support services available
export interface SupportService {
  id: string;
  name: string;
  type: InterventionType;
  description: string;
  availability: string;
  contactInfo?: string;
  eligibility: string[];
}
