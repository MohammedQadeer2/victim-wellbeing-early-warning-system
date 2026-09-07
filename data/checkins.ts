// Mock check-in data for prototype demonstration
// Historical check-ins and AI analysis results

import { CheckIn, DistressHistory } from '@/types';

// Sample check-ins showing progression over time
export const mockCheckIns: CheckIn[] = [
  {
    id: 'CHK-001',
    victimId: 'V-1001',
    timestamp: '2026-07-15T10:30:00Z',
    responses: [
      {
        questionId: 'Q1',
        question: 'How are you feeling today?',
        response: 'A_LITTLE',
        weight: 1.0,
      },
      {
        questionId: 'Q2',
        question: 'Do you feel safe currently?',
        response: 'MODERATELY',
        weight: 1.5,
      },
      {
        questionId: 'Q3',
        question: 'Are you experiencing difficulty sleeping?',
        response: 'A_LITTLE',
        weight: 1.0,
      },
    ],
    textResponse: 'I am managing but feeling some stress about the upcoming court date.',
    distressScore: 42,
    riskLevel: 'MODERATE',
    aiAnalysis: {
      distressScore: 42,
      riskLevel: 'MODERATE',
      detectedSignals: [
        {
          type: 'COURT_ANXIETY',
          severity: 'MODERATE',
          description: 'Stress related to court proceedings',
          indicators: ['Mentioned upcoming court date', 'Expressed concern'],
        },
        {
          type: 'SLEEP_DISTURBANCE',
          severity: 'LOW',
          description: 'Minor sleep difficulties',
          indicators: ['Reported slight sleep issues'],
        },
      ],
      trend: 'STABLE',
      escalationRisk: {
        level: 'LOW',
        probability: 0.25,
        timeframe: 'within 14 days',
        factors: ['Court date approaching', 'Mild stress indicators'],
      },
      explanation: [
        'Distress score indicates moderate concern',
        'Primary stress linked to legal proceedings',
        'No immediate safety concerns detected',
      ],
      recommendedActions: [
        'Continue regular check-ins',
        'Provide court preparation support',
      ],
      confidence: 0.82,
    },
    reviewedBy: 'C-101',
    reviewedAt: '2026-07-15T14:00:00Z',
    status: 'REVIEWED',
  },
  {
    id: 'CHK-002',
    victimId: 'V-1001',
    timestamp: '2026-08-12T11:00:00Z',
    responses: [
      {
        questionId: 'Q1',
        question: 'How are you feeling today?',
        response: 'MODERATELY',
        weight: 1.0,
      },
      {
        questionId: 'Q2',
        question: 'Do you feel safe currently?',
        response: 'A_LITTLE',
        weight: 1.5,
      },
      {
        questionId: 'Q3',
        question: 'Are you experiencing difficulty sleeping?',
        response: 'MODERATELY',
        weight: 1.0,
      },
      {
        questionId: 'Q4',
        question: 'Have you experienced any threats or intimidation?',
        response: 'A_LITTLE',
        weight: 2.0,
      },
    ],
    textResponse: 'Feeling more worried recently. Having trouble sleeping and feeling unsafe at times.',
    distressScore: 58,
    riskLevel: 'MODERATE',
    aiAnalysis: {
      distressScore: 58,
      riskLevel: 'MODERATE',
      detectedSignals: [
        {
          type: 'SAFETY_CONCERN',
          severity: 'MODERATE',
          description: 'Feelings of being unsafe',
          indicators: ['Expressed feeling unsafe', 'Concern about security'],
        },
        {
          type: 'SLEEP_DISTURBANCE',
          severity: 'MODERATE',
          description: 'Sleep difficulties increasing',
          indicators: ['Trouble sleeping', 'Sleep quality declining'],
        },
        {
          type: 'INTIMIDATION',
          severity: 'LOW',
          description: 'Possible intimidation concerns',
          indicators: ['Mentioned feeling worried', 'Slight threat indication'],
        },
        {
          type: 'EMOTIONAL_DISTRESS',
          severity: 'MODERATE',
          description: 'Increased emotional distress',
          indicators: ['Increased worry', 'Emotional language'],
        },
      ],
      trend: 'INCREASING',
      escalationRisk: {
        level: 'MODERATE',
        probability: 0.45,
        timeframe: 'within 7 days',
        factors: [
          'Distress increased from previous check-in',
          'Safety concerns emerging',
          'Sleep quality declining',
          'Multiple stress indicators present',
        ],
      },
      explanation: [
        'Distress score increased significantly (42 → 58)',
        'Safety concerns have emerged',
        'Sleep disturbance worsening',
        'Combination of factors suggests increasing risk',
      ],
      recommendedActions: [
        'Schedule counselling session',
        'Assess safety situation',
        'Provide emotional support',
        'Consider protection services if needed',
      ],
      confidence: 0.87,
    },
    reviewedBy: 'C-101',
    reviewedAt: '2026-08-12T15:30:00Z',
    status: 'ACTION_TAKEN',
  },
  {
    id: 'CHK-003',
    victimId: 'V-1001',
    timestamp: '2026-09-05T09:45:00Z',
    responses: [
      {
        questionId: 'Q1',
        question: 'How are you feeling today?',
        response: 'A_LOT',
        weight: 1.0,
      },
      {
        questionId: 'Q2',
        question: 'Do you feel safe currently?',
        response: 'NOT_AT_ALL',
        weight: 1.5,
      },
      {
        questionId: 'Q3',
        question: 'Are you experiencing difficulty sleeping?',
        response: 'A_LOT',
        weight: 1.0,
      },
      {
        questionId: 'Q4',
        question: 'Have you experienced any threats or intimidation?',
        response: 'MODERATELY',
        weight: 2.0,
      },
      {
        questionId: 'Q5',
        question: 'Are you experiencing fear?',
        response: 'SEVERELY',
        weight: 2.0,
      },
    ],
    textResponse: 'I am very scared and do not feel safe. Someone has been following me and I received threatening messages.',
    distressScore: 82,
    riskLevel: 'HIGH',
    aiAnalysis: {
      distressScore: 82,
      riskLevel: 'HIGH',
      detectedSignals: [
        {
          type: 'THREAT',
          severity: 'HIGH',
          description: 'Active threats detected',
          indicators: ['Threatening messages reported', 'Being followed', 'Immediate danger signals'],
        },
        {
          type: 'SAFETY_CONCERN',
          severity: 'CRITICAL',
          description: 'Severe safety concerns',
          indicators: ['Feels unsafe', 'Stalking behavior reported', 'Immediate risk'],
        },
        {
          type: 'FEAR',
          severity: 'CRITICAL',
          description: 'Severe fear response',
          indicators: ['Expressed severe fear', 'Very scared', 'High anxiety'],
        },
        {
          type: 'SLEEP_DISTURBANCE',
          severity: 'HIGH',
          description: 'Significant sleep difficulties',
          indicators: ['Severe sleep problems', 'High distress affecting rest'],
        },
        {
          type: 'INTIMIDATION',
          severity: 'HIGH',
          description: 'Active intimidation occurring',
          indicators: ['Threatening messages', 'Stalking behavior', 'Pattern of intimidation'],
        },
      ],
      trend: 'INCREASING',
      escalationRisk: {
        level: 'HIGH',
        probability: 0.78,
        timeframe: 'within 2-3 days',
        factors: [
          'Rapid distress escalation (58 → 82)',
          'Active threat situation',
          'Critical safety concerns',
          'Severe fear response',
          'Stalking and threatening behavior',
          'Immediate intervention required',
        ],
      },
      explanation: [
        'Distress score shows significant increase',
        'Active threat situation detected from victim report',
        'Multiple critical safety signals present',
        'Victim experiencing severe fear and feels unsafe',
        'Stalking and threatening messages indicate immediate risk',
        'This case requires urgent human review and intervention',
      ],
      recommendedActions: [
        'URGENT: Review case immediately',
        'Contact victim to assess safety',
        'Consider protection services',
        'Coordinate with law enforcement if needed',
        'Provide emergency support contact',
        'Schedule immediate counselling',
      ],
      confidence: 0.94,
    },
    status: 'ANALYZED',
  },
];

// Historical distress data for trend visualization
// Shows how distress evolves over time for V-1001
export const mockDistressHistory: DistressHistory[] = [
  {
    date: '2026-06-15',
    distressScore: 28,
    riskLevel: 'LOW',
    checkInId: 'CHK-000',
    keySignals: ['Adjustment stress'],
  },
  {
    date: '2026-07-01',
    distressScore: 32,
    riskLevel: 'LOW',
    checkInId: 'CHK-000-1',
    keySignals: ['General anxiety'],
  },
  {
    date: '2026-07-15',
    distressScore: 42,
    riskLevel: 'MODERATE',
    checkInId: 'CHK-001',
    keySignals: ['Court anxiety', 'Sleep difficulty'],
  },
  {
    date: '2026-08-01',
    distressScore: 48,
    riskLevel: 'MODERATE',
    checkInId: 'CHK-001-1',
    keySignals: ['Increased stress'],
  },
  {
    date: '2026-08-12',
    distressScore: 58,
    riskLevel: 'MODERATE',
    checkInId: 'CHK-002',
    keySignals: ['Safety concern', 'Sleep disturbance', 'Intimidation'],
  },
  {
    date: '2026-08-25',
    distressScore: 64,
    riskLevel: 'MODERATE',
    checkInId: 'CHK-002-1',
    keySignals: ['Worry', 'Anxiety'],
  },
  {
    date: '2026-09-05',
    distressScore: 82,
    riskLevel: 'HIGH',
    checkInId: 'CHK-003',
    keySignals: ['Threat', 'Safety concern', 'Fear', 'Intimidation'],
  },
];

// Check-in questions for the victim check-in form
export const checkInQuestions = [
  {
    id: 'Q1',
    question: 'How are you feeling today?',
    description: 'Overall emotional state',
    weight: 1.0,
  },
  {
    id: 'Q2',
    question: 'Do you feel safe currently?',
    description: 'Safety perception',
    weight: 1.5,
  },
  {
    id: 'Q3',
    question: 'Are you experiencing difficulty sleeping?',
    description: 'Sleep quality',
    weight: 1.0,
  },
  {
    id: 'Q4',
    question: 'Have you experienced any threats or intimidation?',
    description: 'Threat assessment',
    weight: 2.0,
  },
  {
    id: 'Q5',
    question: 'Are you experiencing fear?',
    description: 'Fear levels',
    weight: 2.0,
  },
  {
    id: 'Q6',
    question: 'Do you feel comfortable continuing with the legal process?',
    description: 'Legal process comfort',
    weight: 1.5,
  },
  {
    id: 'Q7',
    question: 'Are you experiencing financial difficulties?',
    description: 'Financial stress',
    weight: 1.0,
  },
  {
    id: 'Q8',
    question: 'Do you feel socially isolated or alone?',
    description: 'Social support',
    weight: 1.0,
  },
];
