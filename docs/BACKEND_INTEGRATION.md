# Backend Integration Guide

## Overview

This document explains how to connect the frontend to a Node.js + TypeScript backend.

## Current State (Frontend Only)

The frontend currently uses a service layer (`services/api.ts`) that returns mock data:

```typescript
// Current implementation
export async function getVictimDashboard(victimId: string): Promise<VictimDashboard> {
  await delay(500); // Simulate network
  return mockVictimDashboard; // Mock data
}
```

## Future State (With Backend)

Replace mock data with actual HTTP calls:

```typescript
// Future implementation
export async function getVictimDashboard(victimId: string): Promise<VictimDashboard> {
  const response = await fetch(`${API_BASE_URL}/api/victim/${victimId}/dashboard`, {
    headers: {
      'Authorization': `Bearer ${getAuthToken()}`,
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch dashboard');
  }
  
  return response.json();
}
```

## Required Backend API Endpoints

### Authentication

```
POST /api/auth/login
Request: { email, password, role }
Response: { token, user: { id, name, role } }

POST /api/auth/logout
POST /api/auth/refresh
GET /api/auth/me
```

### Victim Endpoints

```
GET /api/victim/:id/dashboard
Response: VictimDashboard

GET /api/victim/:id/distress-history
Response: DistressHistory[]

GET /api/victim/:id/checkins
Response: CheckIn[]

POST /api/checkin
Request: { victimId, responses, textResponse }
Response: CheckIn (with AI analysis)

GET /api/checkin/questions
Response: Question[]
```

### Counsellor Endpoints

```
GET /api/counsellor/:id/dashboard
Response: CounsellorDashboardStats

GET /api/counsellor/:id/cases
Response: Victim[]

GET /api/counsellor/victim/:victimId
Response: { victim, case, distressHistory, checkIns, alerts, interventions }

GET /api/counsellor/alerts
Response: Alert[]

PATCH /api/alert/:id
Request: { status, notes }
Response: Alert

GET /api/interventions?victimId=xxx
Response: Intervention[]

POST /api/intervention
Request: InterventionData
Response: Intervention
```

### Authority Endpoints

```
GET /api/authority/dashboard
Response: AuthorityDashboardStats

GET /api/authority/risk-distribution
Response: RiskDistribution[]

GET /api/authority/trends
Response: SystemTrendData[]

GET /api/authority/analytics
Response: AnalyticsSummary

GET /api/cases
Response: Case[]

GET /api/cases/high-risk
Response: HighRiskCase[]

GET /api/alerts
Response: Alert[]
```

### Support Endpoints

```
GET /api/support/services
Response: SupportService[]
```

## Step-by-Step Integration

### Step 1: Environment Configuration

Create `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_ENV=development
```

### Step 2: Create API Client

Create `services/apiClient.ts`:

```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// Helper for authenticated requests
async function authenticatedFetch(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem('authToken');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };
  
  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });
  
  if (response.status === 401) {
    // Handle unauthorized - redirect to login
    window.location.href = '/login';
    throw new Error('Unauthorized');
  }
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Request failed');
  }
  
  return response.json();
}

export const apiClient = {
  get: (url: string) => authenticatedFetch(url),
  post: (url: string, data: any) => authenticatedFetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  patch: (url: string, data: any) => authenticatedFetch(url, {
    method: 'PATCH',
    body: JSON.stringify(data),
  }),
  delete: (url: string) => authenticatedFetch(url, {
    method: 'DELETE',
  }),
};
```

### Step 3: Update Service Functions

Update `services/api.ts`:

```typescript
import { apiClient } from './apiClient';

// Remove mock data imports
// Remove delay function

export async function getVictimDashboard(victimId: string): Promise<VictimDashboard> {
  return apiClient.get(`/api/victim/${victimId}/dashboard`);
}

export async function submitCheckIn(data: any): Promise<CheckIn> {
  return apiClient.post('/api/checkin', data);
}

// Update all other functions similarly
```

### Step 4: Add Authentication

Create `services/auth.ts`:

```typescript
import { apiClient } from './apiClient';

export async function login(email: string, password: string, role: string) {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, role }),
  });
  
  if (!response.ok) {
    throw new Error('Login failed');
  }
  
  const { token, user } = await response.json();
  localStorage.setItem('authToken', token);
  localStorage.setItem('user', JSON.stringify(user));
  
  return { token, user };
}

export function logout() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
  window.location.href = '/login';
}

export function getCurrentUser() {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
}

export function isAuthenticated() {
  return !!localStorage.getItem('authToken');
}
```

### Step 5: Add Authentication Guard

Create `components/AuthGuard.tsx`:

```typescript
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, getCurrentUser } from '@/services/auth';

export function AuthGuard({ 
  children, 
  requiredRole 
}: { 
  children: React.ReactNode;
  requiredRole?: string;
}) {
  const router = useRouter();
  
  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }
    
    if (requiredRole) {
      const user = getCurrentUser();
      if (user.role !== requiredRole) {
        router.push('/login');
      }
    }
  }, [router, requiredRole]);
  
  if (!isAuthenticated()) {
    return null;
  }
  
  return <>{children}</>;
}
```

Wrap protected pages:

```typescript
export default function VictimDashboard() {
  return (
    <AuthGuard requiredRole="victim">
      {/* Page content */}
    </AuthGuard>
  );
}
```

### Step 6: Update Login Page

Replace demo login with real authentication:

```typescript
const handleLogin = async (role: string) => {
  try {
    // In real app, collect email/password
    const { user } = await login(email, password, role);
    
    // Redirect based on role
    switch (user.role) {
      case 'victim':
        router.push('/victim');
        break;
      case 'counsellor':
        router.push('/counsellor');
        break;
      case 'authority':
        router.push('/authority');
        break;
    }
  } catch (error) {
    setError('Login failed');
  }
};
```

### Step 7: Error Handling

Create `components/ErrorBoundary.tsx`:

```typescript
'use client';

import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
          <p className="text-gray-600 mb-4">{this.state.error?.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Reload Page
          </button>
        </div>
      );
    }
    
    return this.props.children;
  }
}
```

## Data Validation

Add runtime validation using Zod:

```bash
npm install zod
```

```typescript
import { z } from 'zod';

const VictimDashboardSchema = z.object({
  victimId: z.string(),
  currentDistressScore: z.number().min(0).max(100),
  riskLevel: z.enum(['LOW', 'MODERATE', 'HIGH', 'CRITICAL']),
  // ... other fields
});

export async function getVictimDashboard(victimId: string) {
  const data = await apiClient.get(`/api/victim/${victimId}/dashboard`);
  return VictimDashboardSchema.parse(data); // Validates at runtime
}
```

## Testing Backend Integration

### 1. Create Mock Server

For development, create a simple Express server:

```typescript
// mock-server/index.ts
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/victim/:id/dashboard', (req, res) => {
  res.json(mockVictimDashboard);
});

// Add other endpoints...

app.listen(4000, () => {
  console.log('Mock server running on port 4000');
});
```

### 2. Test Each Endpoint

Create tests for each API function:

```typescript
describe('API Integration', () => {
  it('should fetch victim dashboard', async () => {
    const data = await getVictimDashboard('V-1001');
    expect(data).toBeDefined();
    expect(data.victimId).toBe('V-1001');
  });
});
```

## Migration Checklist

- [ ] Set up backend API server
- [ ] Create database schema
- [ ] Implement authentication
- [ ] Build API endpoints
- [ ] Create API client in frontend
- [ ] Update all service functions
- [ ] Add error handling
- [ ] Add loading states
- [ ] Test authentication flow
- [ ] Test all user journeys
- [ ] Add logging and monitoring
- [ ] Security audit
- [ ] Performance testing
- [ ] Deploy backend
- [ ] Update frontend environment variables
- [ ] Deploy frontend
- [ ] Monitor production

## Database Schema (Suggested)

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Victims table
CREATE TABLE victims (
  id VARCHAR(50) PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  name VARCHAR(255) NOT NULL,
  age INTEGER,
  gender VARCHAR(50),
  district VARCHAR(100),
  case_id VARCHAR(50),
  registration_date DATE,
  assigned_counsellor VARCHAR(50),
  contact_preference VARCHAR(50),
  language_preference VARCHAR(50)
);

-- Check-ins table
CREATE TABLE checkins (
  id VARCHAR(50) PRIMARY KEY,
  victim_id VARCHAR(50) REFERENCES victims(id),
  timestamp TIMESTAMP NOT NULL,
  responses JSONB NOT NULL,
  text_response TEXT,
  distress_score INTEGER,
  risk_level VARCHAR(50),
  ai_analysis JSONB,
  status VARCHAR(50),
  reviewed_by VARCHAR(50),
  reviewed_at TIMESTAMP
);

-- Add other tables as needed
```

## Security Considerations

1. **Never store tokens in localStorage in production** - Use httpOnly cookies
2. **Validate all inputs on backend**
3. **Use HTTPS only**
4. **Implement rate limiting**
5. **Add CSRF protection**
6. **Sanitize all user inputs**
7. **Log all data access for audit**
8. **Encrypt sensitive data**

---

*Follow this guide to smoothly transition from mock data to a real backend.*
