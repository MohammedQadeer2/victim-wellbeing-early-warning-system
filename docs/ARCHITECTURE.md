# System Architecture

## Overview

Sentinel is designed as a **victim well-being monitoring and early warning system** that bridges the gap between traditional case management and dynamic victim support.

## Core Philosophy

### The Problem We Solve

**Traditional Approach:**
- Authorities track CASE STATUS (legal proceedings)
- Victim well-being is unknown or checked infrequently
- Problems are discovered only when they escalate

**Our Approach:**
- Authorities track BOTH case status AND victim well-being
- Continuous monitoring through periodic check-ins
- Early detection of escalating distress
- Proactive intervention before crisis

### Human-in-the-Loop

```
Victim Check-in
      ↓
AI Analysis (Assist)
      ↓
Generate Alert (Recommend)
      ↓
Human Review (Decide)
      ↓
Human Action (Execute)
```

**The AI does NOT:**
- Make autonomous medical diagnoses
- Automatically trigger interventions
- Replace professional judgment

**The AI DOES:**
- Detect patterns in responses
- Calculate distress scores
- Identify risk signals
- Recommend actions for human review

## System Architecture (Current - Frontend Only)

```
┌─────────────────────────────────────┐
│        User Interface Layer         │
│  (Next.js App Router + React)       │
├─────────────────────────────────────┤
│     Three Role-Based Dashboards     │
│  • Victim Dashboard                 │
│  • Counsellor Dashboard             │
│  • Authority Dashboard              │
├─────────────────────────────────────┤
│      Presentation Components        │
│  • Charts (Recharts)                │
│  • Forms & Interactions             │
│  • Data Visualization               │
├─────────────────────────────────────┤
│       Frontend Service Layer        │
│  (services/api.ts)                  │
│  ↓ Currently returns mock data      │
│  ↓ Future: HTTP calls to backend    │
├─────────────────────────────────────┤
│          Mock Data Layer            │
│  (data/*.ts)                        │
│  • Synthetic victim data            │
│  • Sample check-ins                 │
│  • Simulated AI analysis            │
└─────────────────────────────────────┘
```

## Future Architecture (With Backend)

```
┌─────────────────────────────────────┐
│          Frontend (This)            │
│      Next.js + TypeScript           │
└────────────┬────────────────────────┘
             │ HTTPS/REST API
┌────────────┴────────────────────────┐
│      Backend API Server             │
│    Node.js + TypeScript             │
├─────────────────────────────────────┤
│      Authentication Layer           │
│   • JWT tokens                      │
│   • Role-based access control       │
├─────────────────────────────────────┤
│       Business Logic Layer          │
│   • Case management                 │
│   • Check-in processing             │
│   • Alert generation                │
├─────────────────────────────────────┤
│      AI Analysis Service            │
│   • NLP for text analysis           │
│   • Distress score calculation      │
│   • Risk prediction model           │
│   • Explainability engine           │
├─────────────────────────────────────┤
│      Database Layer                 │
│    PostgreSQL                       │
│   • Victim data                     │
│   • Check-in history                │
│   • Interventions                   │
│   • Audit logs                      │
└─────────────────────────────────────┘
```

## Data Flow

### Check-in Flow

```
1. Victim completes check-in form
   ↓
2. Frontend validates and formats data
   ↓
3. [Future] POST to /api/checkin
   ↓
4. [Future] Backend stores in database
   ↓
5. [Future] AI service analyzes responses
   ↓
6. [Future] Generate distress score + signals
   ↓
7. [Future] Check if alert needed
   ↓
8. Frontend displays results
   ↓
9. [Future] Notify assigned counsellor if needed
```

### Alert Flow

```
1. AI detects high-risk indicators
   ↓
2. Generate alert with explanation
   ↓
3. Store in database with metadata
   ↓
4. Notify assigned counsellor
   ↓
5. Counsellor reviews alert
   ↓
6. Human decides on action
   ↓
7. Create intervention if needed
   ↓
8. Track outcome
```

## Component Architecture

### Page Structure

Each role has its own route namespace:
- `/victim/*` - Victim pages
- `/counsellor/*` - Counsellor pages
- `/authority/*` - Authority pages

### Layout System

```
DashboardLayout
├── Navbar (top)
├── Sidebar (left, role-specific)
└── Main Content Area
    ├── PageHeader
    └── Page Content
```

### Component Hierarchy

```
UI Components (components/ui/)
├── Button, Card, Badge
├── Modal, Alert
└── Loading, Empty states

Layout Components (components/layout/)
├── Navbar
├── Sidebar
├── PageHeader
└── DashboardLayout

Dashboard Components (components/dashboard/)
├── DistressScoreCard
├── SignalCard
└── AlertCard

Chart Components (components/charts/)
├── DistressTrendChart
└── RiskDistributionChart
```

## State Management

**Current**: Component-level state with React hooks
- `useState` for local state
- `useEffect` for data fetching
- Props for parent-child communication

**Future Consideration**: 
- For complex global state, consider Zustand or React Context
- Keep state management simple unless complexity demands it

## API Service Layer

Located in `services/api.ts`:

```typescript
// Current: Returns mock data
export async function getVictimDashboard(victimId: string) {
  await delay(500); // Simulate network
  return mockVictimDashboard;
}

// Future: Real API call
export async function getVictimDashboard(victimId: string) {
  const response = await fetch(`/api/victim/${victimId}/dashboard`);
  return response.json();
}
```

## Security Considerations (Future)

1. **Authentication**: JWT-based auth with secure token storage
2. **Authorization**: Role-based access control (RBAC)
3. **Data Privacy**: 
   - Encrypt sensitive data at rest
   - Use HTTPS for all communication
   - Anonymize data in logs
4. **Audit Trail**: Log all access to victim data
5. **Input Validation**: Validate and sanitize all user inputs

## Scalability Considerations (Future)

1. **Database**: PostgreSQL with proper indexing
2. **Caching**: Redis for frequently accessed data
3. **Load Balancing**: Multiple backend instances
4. **CDN**: Static assets served via CDN
5. **Monitoring**: Application performance monitoring

## Design Principles

1. **Separation of Concerns**: Clear boundaries between UI, logic, and data
2. **Progressive Enhancement**: Start simple, add complexity only when needed
3. **Explicit Over Implicit**: Clear, readable code over clever tricks
4. **Human-Centered**: All design decisions prioritize user needs
5. **Privacy by Design**: Privacy considerations from the start

## Technology Choices

### Why Next.js?
- React-based with excellent DX
- App Router for modern routing
- Built-in TypeScript support
- Easy deployment options
- Server and client components

### Why TypeScript?
- Type safety catches errors early
- Better IDE support
- Self-documenting code
- Easier refactoring

### Why Tailwind CSS?
- Utility-first approach
- Consistent design system
- Responsive design built-in
- No CSS specificity issues
- Easy to customize

### Why Recharts?
- React-native chart library
- Good documentation
- Sufficient for prototype needs
- Reasonable file size

## Future Enhancements

1. **Real-time Updates**: WebSocket for live alerts
2. **Offline Support**: PWA capabilities for victims
3. **Multi-language**: i18n for regional languages
4. **Voice Input**: For victims with literacy challenges
5. **Mobile Apps**: Native mobile applications
6. **Integration**: Government systems, legal databases

---

*This architecture supports the current prototype and provides a clear path for production implementation.*
