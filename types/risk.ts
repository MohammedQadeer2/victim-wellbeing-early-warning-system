// Risk assessment and prediction types
// Used for calculating and displaying risk information

import { RiskLevel, TrendDirection } from './victim';

// Historical distress tracking
// Used to show trends over time
export interface DistressHistory {
  date: string;
  distressScore: number;
  riskLevel: RiskLevel;
  checkInId: string;
  keySignals: string[];
}

// Risk prediction output
// AI-generated prediction about future risk
export interface RiskPrediction {
  currentRisk: RiskLevel;
  predictedRisk: RiskLevel;
  predictionTimeframe: string;
  confidence: number;
  contributingFactors: RiskFactor[];
  recommendations: string[];
}

// Individual risk factors
// Explain what contributes to the overall risk
export interface RiskFactor {
  factor: string;
  impact: 'LOW' | 'MODERATE' | 'HIGH';
  description: string;
  evidencePoints: string[];
}

// Longitudinal trend analysis
// Shows how distress changes over weeks/months
export interface TrendAnalysis {
  victimId: string;
  period: string;
  startDate: string;
  endDate: string;
  startingScore: number;
  endingScore: number;
  trend: TrendDirection;
  changePercentage: number;
  criticalEvents: CriticalEvent[];
}

// Events that significantly impacted distress
export interface CriticalEvent {
  date: string;
  event: string;
  impactOnDistress: number;
  relatedSignals: string[];
}
