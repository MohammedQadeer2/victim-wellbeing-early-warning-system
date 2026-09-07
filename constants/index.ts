// Application constants

// Risk level thresholds
export const RISK_THRESHOLDS = {
  LOW: 30,
  MODERATE: 50,
  HIGH: 70,
  CRITICAL: 85,
};

// Response level mappings
export const RESPONSE_LEVELS = {
  NOT_AT_ALL: { value: 'NOT_AT_ALL', label: 'Not at all', score: 0 },
  A_LITTLE: { value: 'A_LITTLE', label: 'A little', score: 1 },
  MODERATELY: { value: 'MODERATELY', label: 'Moderately', score: 2 },
  A_LOT: { value: 'A_LOT', label: 'A lot', score: 3 },
  SEVERELY: { value: 'SEVERELY', label: 'Severely', score: 4 },
};

// Alert severity levels
export const ALERT_SEVERITY = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
  CRITICAL: 'Critical',
};

// Intervention types with labels
export const INTERVENTION_TYPES = {
  COUNSELLING: 'Counselling Support',
  SAFETY_ASSESSMENT: 'Safety Assessment',
  LEGAL_ASSISTANCE: 'Legal Assistance',
  FINANCIAL_ASSISTANCE: 'Financial Assistance',
  REHABILITATION_SUPPORT: 'Rehabilitation Support',
  PROTECTION_SERVICES: 'Protection Services',
  MEDICAL_REFERRAL: 'Medical Referral',
  EMERGENCY_RESPONSE: 'Emergency Response',
};

// Demo user credentials for prototype
export const DEMO_USERS = {
  VICTIM: {
    id: 'V-1001',
    role: 'victim',
    name: 'Demo Victim',
  },
  COUNSELLOR: {
    id: 'C-101',
    role: 'counsellor',
    name: 'Demo Counsellor',
  },
  AUTHORITY: {
    id: 'AUTH-001',
    role: 'authority',
    name: 'Demo Authority',
  },
};

// Navigation items for each role
export const VICTIM_NAV_ITEMS = [
  { label: 'Dashboard', href: '/victim' },
  { label: 'Check-in', href: '/victim/check-in' },
  { label: 'AI Assistant', href: '/victim/assistant' },
  { label: 'My Well-being', href: '/victim/wellbeing' },
  { label: 'History', href: '/victim/history' },
  { label: 'Support', href: '/victim/support' },
];

export const COUNSELLOR_NAV_ITEMS = [
  { label: 'Dashboard', href: '/counsellor' },
  { label: 'My Cases', href: '/counsellor/cases' },
  { label: 'High-Risk Alerts', href: '/counsellor/alerts' },
  { label: 'Interventions', href: '/counsellor/interventions' },
  { label: 'Notifications', href: '/counsellor/notifications' },
];

export const AUTHORITY_NAV_ITEMS = [
  { label: 'Dashboard', href: '/authority' },
  { label: 'Cases', href: '/authority/cases' },
  { label: 'High-Risk', href: '/authority/high-risk' },
  { label: 'Alerts', href: '/authority/alerts' },
  { label: 'Analytics', href: '/authority/analytics' },
  { label: 'Reports', href: '/authority/reports' },
];
