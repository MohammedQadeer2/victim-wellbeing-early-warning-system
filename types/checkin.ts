// Check-in data structures
// Captures periodic well-being assessments from victims

export interface CheckIn {
  id: string;
  victimId: string;
  timestamp: string;
  responses: CheckInResponse[];
  textResponse?: string;
  distressScore: number; // 0-100 scale
  riskLevel: import('./victim').RiskLevel;
  aiAnalysis: AIAnalysis;
  reviewedBy?: string;
  reviewedAt?: string;
  status: CheckInStatus;
}

// Individual question response within a check-in
export interface CheckInResponse {
  questionId: string;
  question: string;
  response: ResponseLevel;
  weight: number; // Importance weight for scoring
}

// Response levels for check-in questions
export type ResponseLevel = 
  | 'NOT_AT_ALL'
  | 'A_LITTLE'
  | 'MODERATELY'
  | 'A_LOT'
  | 'SEVERELY';

// AI analysis results from the check-in
// This represents the output from the AI analysis engine
export interface AIAnalysis {
  distressScore: number;
  riskLevel: import('./victim').RiskLevel;
  detectedSignals: RiskSignal[];
  trend: import('./victim').TrendDirection;
  escalationRisk: EscalationRisk;
  explanation: string[];
  recommendedActions: string[];
  confidence: number; // 0-1 confidence score
}

// Individual risk signals detected by AI
export interface RiskSignal {
  type: SignalType;
  severity: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  description: string;
  indicators: string[];
}

// Types of psychological/emotional signals
export type SignalType =
  | 'FEAR'
  | 'THREAT'
  | 'SAFETY_CONCERN'
  | 'SLEEP_DISTURBANCE'
  | 'EMOTIONAL_DISTRESS'
  | 'SOCIAL_ISOLATION'
  | 'FINANCIAL_STRESS'
  | 'COURT_ANXIETY'
  | 'INTIMIDATION'
  | 'LOSS_OF_CONFIDENCE'
  | 'TRAUMA_SYMPTOMS'
  | 'SUICIDAL_IDEATION';

// Escalation risk assessment
export interface EscalationRisk {
  level: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  probability: number; // 0-1 probability of escalation
  timeframe: string; // e.g., "within 7 days"
  factors: string[];
}

// Check-in processing status
export type CheckInStatus = 
  | 'SUBMITTED'
  | 'ANALYZED'
  | 'REVIEWED'
  | 'ACTION_TAKEN';
