// Authentication Types
// TypeScript interfaces for authentication and authorization

// User roles in the system
export type UserRole = 'VICTIM' | 'COUNSELLOR' | 'AUTHORITY';

// User object structure
export interface User {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

// User data without sensitive password hash
export interface SafeUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
}

// Login request from frontend
export interface LoginRequest {
  email: string;
  password: string;
}

// Login response to frontend
export interface LoginResponse {
  success: boolean;
  token: string;
  user: SafeUser;
}

// Registration request
export interface RegisterRequest {
  email: string;
  name: string;
  password: string;
  role: UserRole;
}

// JWT token payload (what's encoded in the token)
export interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
  iat: number;  // Issued at time
  exp: number;  // Expiration time
}

// Request context with authenticated user
// Added to req.user by auth middleware
export interface AuthenticatedRequest {
  user?: {
    id: string;
    email: string;
    role: UserRole;
  };
}

// Response wrapper for consistency
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: string[];
}
