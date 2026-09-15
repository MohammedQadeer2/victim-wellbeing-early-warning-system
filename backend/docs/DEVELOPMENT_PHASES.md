# Sentinel Backend Development Phases

This document tracks the progress of building the Sentinel backend step-by-step.

---

## PHASE 1 ✅ COMPLETE

### Backend Foundation

**Goal:** Establish basic Express server with TypeScript and verify it works.

**Completed:**
- ✅ Node.js + Express project
- ✅ TypeScript configuration
- ✅ Environment variables setup
- ✅ CORS configuration
- ✅ `/health` endpoint for server verification
- ✅ `/api/version` endpoint for version info
- ✅ Graceful error handling

**Files Created:**
- `backend/src/server.ts` - Express app configuration
- `backend/src/index.ts` - Server entry point
- `backend/package.json` - Dependencies
- `backend/tsconfig.json` - TypeScript config
- `backend/.env` - Local environment variables
- `backend/.env.example` - Environment template
- `backend/.gitignore` - Git ignore rules
- `backend/README.md` - Getting started guide

**What You Learned:**
- How Node.js runs JavaScript on servers
- How Express handles HTTP requests and routes
- How TypeScript adds type safety
- What middleware is and how it works
- How environment variables configure apps
- The request → response lifecycle

**How to Test:**
```bash
cd backend
npm run dev
curl http://localhost:3001/health
```

**Expected Result:**
```json
{
  "status": "ok",
  "message": "Sentinel backend is running",
  "timestamp": "2026-09-14T19:00:21.237Z",
  "environment": "development"
}
```

**Git Commit:**
```
feat: backend foundation - Express server, TypeScript, health endpoint (Phase 1)
```

**Status:** VERIFIED & WORKING ✅

---

## PHASE 2 🔄 IN PROGRESS

### Database + Prisma Setup

**Goal:** Set up PostgreSQL database with Prisma ORM and create core schema.

**Current Progress:**

**Completed:**
- ✅ Prisma schema definition (8 entities)
- ✅ Database entity relationships
- ✅ Prisma client initialization
- ✅ Database schema documentation
- ✅ Architecture documentation

**In Progress:**
- ⏳ Database environment configuration
- ⏳ Migration setup
- ⏳ Seed data generation

**Files Created:**
- `backend/prisma/schema.prisma` - Complete database schema (335 lines)
- `backend/src/database/prisma.ts` - Prisma client singleton
- `backend/docs/DATABASE_SCHEMA.md` - Schema documentation (350+ lines)
- `backend/docs/ARCHITECTURE.md` - Architecture overview (450+ lines)

**What's Being Built:**

**Schema Entities:**
1. **User** - Authentication & authorization
2. **Victim** - Case subject/victim person
3. **Case** - Legal case involving victim
4. **CheckIn** - Periodic well-being assessment
5. **AIAnalysis** - Signal extraction from check-in
6. **RiskAssessment** - Distress score calculation
7. **Alert** - High-risk flag for case
8. **Intervention** - Support action/help provided

**Key Features:**
- Longitudinal data: CheckIns stored as separate records over time
- Historical tracking: Never overwrite, always append
- Explainability: Risk scores have documented reasons
- Role-based: User roles determine data access
- Audit trail: Timestamps on all records

**Next Steps:**
1. PostgreSQL installation verification
2. Database creation
3. Prisma migrations
4. Seed data generation
5. Test database queries

**Status:** SCHEMA COMPLETE, AWAITING TESTING 🔄

---

## PHASE 3 ⏳ TODO

### Authentication + Role-Based Access Control (RBAC)

**Goal:** Implement user login, password hashing, JWT tokens, and role-based authorization.

**Will Build:**
- `backend/routes/auth.routes.ts` - Authentication endpoints
- `backend/controllers/auth.controller.ts` - Login/register logic
- `backend/middleware/auth.ts` - Verify JWT token
- `backend/middleware/role.ts` - Check user role
- `backend/services/auth.service.ts` - Authentication logic
- `backend/utils/password.ts` - Password hashing/verification
- `backend/types/auth.ts` - TypeScript interfaces

**Endpoints to Create:**
```
POST   /api/auth/register       - Create new user account
POST   /api/auth/login          - Login with email/password
POST   /api/auth/logout         - Logout
GET    /api/auth/me             - Get current user info
POST   /api/auth/refresh        - Refresh JWT token
```

**What You'll Learn:**
- How passwords are hashed with bcrypt
- JWT token structure and verification
- Middleware for authentication
- Role-based access control patterns
- Secure session management

**Security Measures:**
- Passwords hashed with bcrypt (never plain text)
- JWT tokens signed with secret key
- Token expiration (short-lived)
- Password strength validation
- SQL injection prevention (via Prisma)

**Status:** NOT STARTED ⏳

---

## PHASE 4 ⏳ TODO

### Victim + Case Management

**Goal:** Create APIs to manage victims and their cases.

**Will Build:**
- `backend/routes/victim.routes.ts`
- `backend/routes/case.routes.ts`
- `backend/controllers/victim.controller.ts`
- `backend/controllers/case.controller.ts`
- `backend/services/victim.service.ts`
- `backend/services/case.service.ts`

**Endpoints to Create:**
```
POST   /api/victims             - Create new victim
GET    /api/victims/:id         - Get victim details
GET    /api/victims             - List victims (authority only)

POST   /api/cases               - Create new case
GET    /api/cases/:id           - Get case details
GET    /api/cases               - List cases (filtered by role)
PATCH  /api/cases/:id           - Update case
PATCH  /api/cases/:id/assign    - Assign counsellor
```

**Business Logic:**
- Victims can only see their own data
- Counsellors can see assigned cases
- Authority can see all cases
- Case assignment tracks counsellor responsibility

**Status:** NOT STARTED ⏳

---

## PHASE 5 ⏳ TODO

### Check-in System

**Goal:** Implement periodic well-being assessment submission and retrieval.

**Will Build:**
- `backend/routes/checkin.routes.ts`
- `backend/controllers/checkin.controller.ts`
- `backend/services/checkin.service.ts`

**Endpoints to Create:**
```
POST   /api/check-ins           - Submit new check-in
GET    /api/check-ins/:id       - Get check-in details
GET    /api/cases/:caseId/check-ins - List check-ins for case
GET    /api/victims/:id/check-ins   - List check-ins for victim
```

**Key Features:**
- Immutable check-in records (never update)
- Responses stored as JSON
- Source tracking (WEB, CHATBOT, SMS, etc.)
- Timestamps for trend analysis

**Data Stored:**
```json
{
  "caseId": "case_123",
  "responses": {
    "q1": "STRONGLY_AGREE",
    "q2": "SOMEWHAT_DISAGREE",
    ...
  },
  "textResponse": "I'm worried about...",
  "source": "WEB",
  "createdAt": "2026-09-15T..."
}
```

**Status:** NOT STARTED ⏳

---

## PHASE 6 ⏳ TODO

### AI Analysis Service

**Goal:** Extract structured signals from check-in responses.

**Will Build:**
- `backend/src/ai/ai.service.ts` - AI orchestration
- `backend/src/ai/signal-extractor.ts` - Signal detection
- `backend/src/ai/ai-prompts.ts` - LLM prompts
- `backend/types/ai.ts` - AI types

**MVP Approach:**
Phase 1 (now):
- Deterministic/rule-based analysis
- No LLM dependency
- Fast and reliable

Phase 2 (later):
- Integrate OpenAI/Anthropic
- Fine-tune for domain
- Add confidence scores

**Output Structure:**
```json
{
  "signals": [
    "Threat detected",
    "Severe fear",
    "Safety concern",
    "Sleep disturbance"
  ],
  "sentiment": "negative",
  "emotions": [
    "fear",
    "anxiety",
    "helplessness"
  ]
}
```

**Why Separate from Risk Engine?**
- AI extracts signals (what did victim say?)
- Risk engine calculates score (what does it mean?)
- Easy to replace AI provider later
- Explainability: see raw signals

**Status:** NOT STARTED ⏳

---

## PHASE 7 ⏳ TODO

### Risk Engine

**Goal:** Calculate distress score, risk levels, and trends.

**Will Build:**
- `backend/src/risk/risk-engine.ts` - Main scoring logic
- `backend/src/risk/distress-score.ts` - Score calculation
- `backend/src/risk/trend-analysis.ts` - Trend detection
- `backend/src/risk/escalation.ts` - Escalation prediction

**Scoring Algorithm:**
```
distressScore = baseScore + signalPoints + trendAdjustment

Example:
  baseScore: 30
  + threat: 25
  + fear: 20
  + increasing trend: 5
  = 80 (HIGH risk)
```

**Risk Levels:**
- LOW: 0-30
- MODERATE: 31-60
- HIGH: 61-80
- CRITICAL: 81-100

**Trend Analysis:**
- STABLE: Score unchanged
- INCREASING: Score going up
- DECREASING: Score going down
- FLUCTUATING: High variability

**Output:**
```json
{
  "distressScore": 82,
  "riskLevel": "HIGH",
  "trend": "INCREASING",
  "escalationRisk": "HIGH",
  "reasons": [
    "Threat detected",
    "Severe fear",
    "Sleep disturbance",
    "Distress increased from 71"
  ]
}
```

**Status:** NOT STARTED ⏳

---

## PHASE 8 ⏳ TODO

### Check-in → AI → Risk Pipeline

**Goal:** Connect the complete workflow from check-in submission to risk assessment.

**Will Implement:**
```
POST /check-ins
    ↓
1. Save CheckIn record
    ↓
2. Call AI Service
    ↓
3. Save AIAnalysis record
    ↓
4. Call Risk Engine
    ↓
5. Save RiskAssessment record
    ↓
6. Check if HIGH/CRITICAL
    ↓
7. Create Alert if needed
    ↓
8. Return complete response
```

**Response Example:**
```json
{
  "success": true,
  "data": {
    "checkIn": { ... },
    "aiAnalysis": { ... },
    "riskAssessment": { ... },
    "alert": { ... } or null
  }
}
```

**What You'll Learn:**
- Orchestrating multiple services
- Transaction-like behavior without transactions
- Error handling in complex flows
- Async/await patterns
- Logging for debugging

**Status:** NOT STARTED ⏳

---

## PHASE 9 ⏳ TODO

### Alert System

**Goal:** Manage high-risk alerts and their lifecycle.

**Will Build:**
- `backend/routes/alert.routes.ts`
- `backend/controllers/alert.controller.ts`
- `backend/services/alert.service.ts`

**Endpoints:**
```
GET    /api/alerts             - List alerts (filtered by role)
GET    /api/alerts/:id         - Get alert details
PATCH  /api/alerts/:id         - Update alert status
POST   /api/alerts/:id/review  - Mark alert as reviewed
POST   /api/alerts/:id/dismiss - Dismiss alert
```

**Alert Statuses:**
- OPEN: Needs review
- ACKNOWLEDGED: Someone saw it
- REVIEWED: Counsellor reviewed
- RESOLVED: Case stabilized
- DISMISSED: False positive

**Status:** NOT STARTED ⏳

---

## PHASE 10 ⏳ TODO

### Intervention System

**Goal:** Track support actions and their outcomes.

**Will Build:**
- `backend/routes/intervention.routes.ts`
- `backend/controllers/intervention.controller.ts`
- `backend/services/intervention.service.ts`

**Endpoints:**
```
POST   /api/interventions       - Create intervention
GET    /api/interventions/:id   - Get intervention
PATCH  /api/interventions/:id   - Update intervention
GET    /api/cases/:id/interventions - List case interventions
```

**Intervention Categories:**
- COUNSELLING
- SAFETY_ASSESSMENT
- LEGAL_ASSISTANCE
- FINANCIAL_ASSISTANCE
- REHABILITATION_SUPPORT
- PROTECTION_RELOCATION_REVIEW
- OTHER

**Status Workflow:**
```
RECOMMENDED → IN_PROGRESS → COMPLETED
           ↘ NEEDS_REVIEW
             ↘ CANCELLED
```

**Status:** NOT STARTED ⏳

---

## PHASE 11 ⏳ TODO

### Dashboard APIs

**Goal:** Create role-specific dashboard endpoints.

**Victim Dashboard:**
```
GET /api/victim/dashboard
Returns:
- Current case
- Latest distress score
- Risk trend
- Recent check-ins
- Assigned interventions
- Support information
```

**Counsellor Dashboard:**
```
GET /api/counsellor/dashboard
Returns:
- Assigned cases
- High-risk cases
- Open alerts
- Recent check-ins
- Interventions to follow-up
```

**Authority Dashboard:**
```
GET /api/authority/dashboard
Returns:
- Total cases
- Risk distribution
- High-risk count
- Recent alerts
- District statistics
- Trend analysis
```

**Status:** NOT STARTED ⏳

---

## PHASE 12 ⏳ TODO

### Frontend Integration

**Goal:** Connect the frontend to real backend APIs.

**Will Do:**
- Update frontend API service layer
- Replace mock data with real API calls
- Handle loading states
- Error handling
- Token management
- Refresh logic

**Frontend Services to Update:**
- `services/api.ts` - API endpoints
- `types/` - Align with backend responses
- `constants/` - Remove mock data
- Authentication flow

**Status:** NOT STARTED ⏳

---

## Summary

| Phase | Goal | Status | Expected Completion |
|-------|------|--------|---------------------|
| 1 | Backend foundation | ✅ DONE | Sept 14 |
| 2 | Database + Prisma | 🔄 IN PROGRESS | Sept 15 |
| 3 | Auth + RBAC | ⏳ TODO | Sept 16 |
| 4 | Victim + Case | ⏳ TODO | Sept 17 |
| 5 | Check-ins | ⏳ TODO | Sept 18 |
| 6 | AI Analysis | ⏳ TODO | Sept 19 |
| 7 | Risk Engine | ⏳ TODO | Sept 20 |
| 8 | Pipeline | ⏳ TODO | Sept 21 |
| 9 | Alerts | ⏳ TODO | Sept 22 |
| 10 | Interventions | ⏳ TODO | Sept 23 |
| 11 | Dashboard APIs | ⏳ TODO | Sept 24 |
| 12 | Frontend Integration | ⏳ TODO | Sept 25 |

---

## Key Principles

1. **Step-by-Step Learning** - Build phase-by-phase, understand each part
2. **Working Code** - Each phase produces testable, working code
3. **Clear Documentation** - Explain why, how, and what
4. **Type Safety** - TypeScript catches errors early
5. **Simple Design** - No unnecessary complexity
6. **Explainability** - System shows why decisions were made
7. **Human-in-the-Loop** - AI assists, humans decide

---

## How to Use This Document

- Review each phase before starting
- Mark completion when phase is done
- Document learnings and decisions
- Update timestamps as you progress
- Keep this as reference for project status
