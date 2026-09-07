// Case management types
// Legal case information and status tracking

export interface Case {
  id: string; // Format: CASE-2026-001
  victimId: string;
  caseType: CaseType;
  status: CaseStatus;
  registrationDate: string;
  lastUpdated: string;
  district: string;
  court?: string;
  nextHearingDate?: string;
  stage: CaseStage;
  assignedOfficer?: string;
}

// Types of cases handled by the system
export type CaseType = 
  | 'Assault'
  | 'Domestic Violence'
  | 'Sexual Harassment'
  | 'Trafficking'
  | 'Child Abuse'
  | 'Other';

// Case status in the legal system
export type CaseStatus = 
  | 'Registered'
  | 'Under Investigation'
  | 'Chargesheet Filed'
  | 'Trial'
  | 'Verdict'
  | 'Closed';

// Stages of the legal process
export type CaseStage = 
  | 'Investigation'
  | 'Pre-Trial'
  | 'Trial'
  | 'Post-Trial'
  | 'Rehabilitation';
