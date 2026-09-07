// User role types for the system
// Three main roles: Victim, Counsellor, and Authority
export type UserRole = 'victim' | 'counsellor' | 'authority';

// User interface representing system users
export interface User {
  id: string;
  name: string;
  role: UserRole;
  email?: string;
  phone?: string;
  district?: string;
  assignedCases?: string[];
}
