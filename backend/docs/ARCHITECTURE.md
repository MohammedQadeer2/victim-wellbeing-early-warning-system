# Sentinel Backend Architecture

## System Overview

Sentinel is an AI-assisted early-warning system for monitoring victim well-being throughout the legal case lifecycle.

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (Next.js)                       │
│                  - Victim Dashboard                         │
│                  - Counsellor Dashboard                     │
│                  - Authority Analytics                      │
└─────────────────────────────────────────────────────────────┘
                            ↑↓
                     HTTP JSON API
                    (Port 3001)
┌─────────────────────────────────────────────────────────────┐
│              Backend (Node.js + Express)                    │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Routes & Controllers - API Endpoints                │   │
│  │ - /auth (login, register)                           │   │
│  │ - /victims (victim management)                      │   │
│  │ - /cases (case management)                          │   │
│  │ - /check-ins (well-being assessments)               │   │
│  │ - /risk (risk assessments & trends)                 │   │
│  │ - /alerts (alert management)                        │   │
│  │ - /interventions (support actions)                  │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Services - Business Logic                           │   │
│  │ - Check-in Service                                  │   │
│  │ - AI Analysis Service                               │   │
│  │ - Risk Engine                                       │   │
│  │ - Alert Engine                                      │   │
│  │ - Intervention Service                              │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Middleware - Cross-Cutting Concerns                 │   │
│  │ - Authentication (JWT)                              │   │
│  │ - Authorization (RBAC)                              │   │
│  │ - Error Handling                                    │   │
│  │ - Logging                                           │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↑↓
                      Prisma ORM
┌─────────────────────────────────────────────────────────────┐
│            PostgreSQL Database                              │
│  - Users, Victims, Cases                                    │
│  - CheckIns, AIAnalyses, RiskAssessments                   │
│  - Alerts, Interventions                                   │
└─────────────────────────────────────────────────────────────┘
```

---

## Core Workflow: Check-in to Intervention

This is the heart of Sentinel - the complete flow from victim input to counsellor action.

### **Step 1: Victim Completes Check-in**

```
Victim opens app
    ↓
Completes questionnaire
    ↓
POST /check-ins
{
  "caseId": "case_123",
  "responses": {
    "q1": "STRONGLY_AGREE",
    "q2": "SOMEWHAT_DISAGREE",
    ...
  },
  "textResponse": "I'm worried about..."
}
    ↓
Backend receives request
```

### **Step 2: Save Check-in**

```
checkin.controller.ts
    ↓
checkin.service.ts → INSERT INTO check_ins
    ↓
Database stores record with timestamp
    ↓
CheckIn ID returned (immutable record created)
```

### **Step 3: Analyze with AI**

```
AI Service receives:
{
  responses: { ... },
  textResponse: "I'm worried about..."
}
    ↓
AI extracts signals:
{
  signals: ["Threat detected", "Severe fear", "Sleep disturbance"],
  sentiment: "negative",
  emotions: ["fear", "anxiety", "despair"]
}
    ↓
INSERT INTO ai_analyses
```

### **Step 4: Calculate Risk**

```
Risk Engine receives AI signals
    ↓
Applies scoring algorithm:
  - Threat = +25 points
  - Fear = +15 points
  - Sleep disturbance = +10 points
  - Previous score (71) showed trend
  - Trend increase = +5 points
    ↓
Total: 42 + 25 + 15 + 10 + 5 = 71 → 82
    ↓
Risk Level: 82 = HIGH (61-80 = HIGH)
Trend: INCREASING (71 → 82)
Escalation Risk: HIGH (increasing trend + high signals)
    ↓
INSERT INTO risk_assessments
```

### **Step 5: Create Alert (if HIGH/CRITICAL)**

```
IF riskLevel IN (HIGH, CRITICAL)
    ↓
Alert created:
{
  caseId: "case_123",
  riskAssessmentId: "risk_456",
  distressScore: 82,
  reasons: ["Threat detected", "Severe fear", "Sleep disturbance", "Distress increasing"],
  status: "OPEN"
}
    ↓
INSERT INTO alerts
    ↓
Notification sent to counsellor (Phase 2+)
```

### **Step 6: Counsellor Reviews Alert**

```
Counsellor sees alert in dashboard
    ↓
Clicks alert to review
    ↓
Sees:
  - Victim details
  - Case history
  - Current distress score (82)
  - Reasons for alert
  - Previous check-in trend
  - AI signals extracted
    ↓
Counsellor decides on action
```

### **Step 7: Create Intervention**

```
Counsellor clicks "Create Intervention"
    ↓
POST /interventions
{
  "alertId": "alert_789",
  "caseId": "case_123",
  "category": "SAFETY_ASSESSMENT",
  "description": "Conduct safety assessment due to threats",
  "status": "RECOMMENDED"
}
    ↓
INSERT INTO interventions
    ↓
Intervention tracked in system
```

### **Step 8: Follow-up & Resolution**

```
Intervention status progresses:
  RECOMMENDED → IN_PROGRESS → COMPLETED
    ↓
After support provided, counsellor updates alert:
  Alert status: REVIEWED → RESOLVED
    ↓
System shows resolved case
    ↓
Next check-in will show if distress improved
```

---

## API Layer Architecture

### **Layered Pattern**

```
Route Handler
    ↓
Controller (Request validation, response formatting)
    ↓
Service (Business logic, orchestration)
    ↓
Prisma (Database queries)
    ↓
PostgreSQL
```

### **Example: POST /check-ins**

```typescript
// Route (routes/checkin.routes.ts)
router.post('/check-ins', auth, createCheckIn)

// Controller (controllers/checkin.controller.ts)
async function createCheckIn(req, res) {
  // Validate request
  const data = validateCheckInInput(req.body)
  
  // Call service
  const checkIn = await checkinService.createCheckIn(data)
  
  // Format response
  res.json({ success: true, data: checkIn })
}

// Service (services/checkin.service.ts)
async function createCheckIn(data) {
  // Save check-in
  const checkIn = await prisma.checkIn.create({ data })
  
  // Analyze with AI
  const analysis = await aiService.analyze(checkIn.responses)
  
  // Calculate risk
  const risk = await riskEngine.calculateRisk(analysis)
  
  // Create alert if needed
  if (risk.riskLevel === 'HIGH' || risk.riskLevel === 'CRITICAL') {
    await alertService.createAlert(checkIn, risk)
  }
  
  return { checkIn, analysis, risk }
}

// Database (via Prisma)
await prisma.checkIn.create({
  data: {
    caseId: "case_123",
    responses: { q1: "...", ... },
    source: "WEB"
  }
})
```

---

## Role-Based Access Control (RBAC)

The system has three roles with different permissions:

### **VICTIM**
Can:
- View own dashboard
- Complete check-ins
- Talk to AI assistant
- View own case information
- View distress trends
- View assigned interventions

Cannot:
- View other victims' data
- Create alerts
- Access counsellor/authority features

### **COUNSELLOR**
Can:
- View assigned cases
- Review check-in history
- View risk scores and trends
- See AI-generated alerts
- Create and update interventions
- Review other counsellors' work (optional)

Cannot:
- View all cases (only assigned)
- Create cases
- Delete victims
- Access authority features

### **AUTHORITY**
Can:
- View all cases
- View district/state-level analytics
- See high-risk cases
- Access reports and statistics
- View all alerts
- Monitor system health

Cannot:
- Modify victim data directly
- Create counsellor assignments (handled separately)

**Implementation:**
```typescript
// Middleware checks role
app.get('/cases', authMiddleware, roleMiddleware(['COUNSELLOR', 'AUTHORITY']), handler)

// Service filters by role
async function getCases(userId, role) {
  if (role === 'COUNSELLOR') {
    // Only assigned cases
    return prisma.case.findMany({
      where: { assignedCounsellorId: userId }
    })
  } else if (role === 'AUTHORITY') {
    // All cases
    return prisma.case.findMany()
  }
}
```

---

## Data Flow for Longitudinal Analysis

### **Tracking Distress Over Time**

```
June 1: CheckIn 1
  ├── Responses: slightly worried
  ├── AI Signals: Mild anxiety
  ├── Distress Score: 42
  ├── Risk Level: LOW
  └── Status: Stable

July 1: CheckIn 2
  ├── Responses: more worried, threat mentioned
  ├── AI Signals: Threat, fear, anxiety
  ├── Distress Score: 57
  ├── Risk Level: MODERATE
  ├── Trend compared to June: INCREASING (+15 points)
  └── Action: Counsellor provides support

August 1: CheckIn 3
  ├── Responses: scared, can't sleep, threats continuing
  ├── AI Signals: Threat, severe fear, sleep disturbance
  ├── Distress Score: 71
  ├── Risk Level: HIGH
  ├── Trend: INCREASING (+14 points)
  ├── Alert: CREATED (HIGH RISK)
  └── Action: Safety assessment conducted

September 1: CheckIn 4
  ├── Responses: still scared but feeling safer with support
  ├── AI Signals: Fear, concern, but gratitude
  ├── Distress Score: 68
  ├── Risk Level: HIGH
  ├── Trend: STABLE (slight decrease, monitoring)
  ├── Alert: None new (already intervened)
  └── Action: Continue support

Overall Trend: INCREASING → STABLE
System detected escalation and triggered intervention
Support provided and distress beginning to stabilize
```

**Why This Matters:**
- Single check-in score (71) might not trigger alerts
- But INCREASING TREND (42 → 57 → 71) signals real problem
- System predicts escalation before crisis
- Counsellor can provide preventive support
- Longitudinal data proves the intervention worked (71 → 68)

---

## AI Architecture

### **Why Separate AI from Risk Calculation?**

```
Option 1: LLM decides risk level (wrong)
  Victim input → LLM → "I estimate 73% probability of crisis" ✗
  Problem: Subjective, hard to explain, inconsistent

Option 2: AI extracts signals → Risk engine calculates (right)
  Victim input → AI → ["Threat", "Fear", "Sleep disorder"] ✓
  → Risk engine → Score: 73 (based on rules) ✓
  → Output: Reasons for score, easy to explain
```

### **AI Service Interface**

```typescript
interface AIAnalysis {
  signals: string[]  // Extracted risk indicators
  sentiment: string  // positive | negative | neutral | mixed
  emotions: string[] // fear, anxiety, despair, etc.
}

async function analyzeCheckIn(responses: CheckInResponses): Promise<AIAnalysis> {
  // Phase 2: Mock/deterministic analysis
  // Phase 3+: Integrate real LLM (OpenAI, Anthropic, etc.)
  
  return {
    signals: detectSignals(responses),
    sentiment: analyzeSentiment(responses),
    emotions: extractEmotions(responses)
  }
}
```

### **Risk Engine Algorithm**

```
distressScore = baseScore + signalPoints + trendAdjustment + noveltyAdjustment

baseScore:
  - Start at 30 (baseline)

signalPoints:
  - Threat detected: +25
  - Severe fear: +20
  - Safety concern: +20
  - Sleep disturbance: +15
  - Anxiety: +15
  - Depression: +15
  - Social isolation: +10
  - Financial stress: +10
  - Repeated court stress: +10
  (multiple signals can apply)

trendAdjustment:
  - Score increased 10-20% from previous: +3
  - Score increased 20%+ from previous: +5
  - Score decreased: -2

noveltyAdjustment:
  - New threat signal: +5
  - Multiple serious signals together: +5

Result: 0-100 scale mapped to risk levels
```

---

## Error Handling Strategy

### **Response Format**

All API responses follow consistent structure:

```json
{
  "success": true/false,
  "data": {...} or null,
  "message": "Human-readable message",
  "errors": [...] // Only if validation errors
}
```

### **Error Types**

```
400: Bad Request (validation error)
  ├── Missing required field
  ├── Invalid data type
  └── Business logic violation

401: Unauthorized (authentication required)
  └── User not logged in

403: Forbidden (authorization denied)
  └── User doesn't have permission

404: Not Found
  ├── Resource doesn't exist
  └── Record was deleted

500: Internal Server Error
  ├── Unexpected exception
  └── Database connection error
```

### **Error Handling Middleware**

```typescript
app.use((err, req, res, next) => {
  console.error('Error:', err)
  
  const status = err.status || 500
  const message = err.message || 'Internal server error'
  
  res.status(status).json({
    success: false,
    message,
    error: process.env.NODE_ENV === 'development' ? err : {}
  })
})
```

---

## Scalability Considerations

### **Current (MVP)**
- Single Node.js process
- Direct PostgreSQL connection
- In-memory caching (none yet)
- Simple synchronous processing

### **Future Improvements**
- Load balancing (multiple Node instances)
- Redis caching for frequently accessed data
- Message queue (RabbitMQ) for async processing
- Database connection pooling (PgBouncer)
- Separate AI service (Python with FastAPI)
- Notification service (SMS, email)
- Separate analytics database (read-only replica)

---

## Security Architecture

### **Authentication Flow**

```
1. User logs in: POST /auth/login (email, password)
2. Backend hashes password, compares with stored hash
3. If match: Generate JWT token
4. Send token to frontend
5. Frontend stores token in secure cookie/localStorage
6. Frontend sends token in Authorization header for protected routes
7. Middleware verifies token signature before allowing access
```

### **Authorization Flow**

```
1. Token contains: { userId, role, iat, exp }
2. Middleware decodes token
3. Checks if user has required role
4. Service layer filters data by user's role
5. Database returns only authorized data
```

### **Password Security**

```
1. User provides password
2. Backend generates salt
3. Hash password with salt using bcrypt
4. Store hash in database (NEVER plain text)
5. On login, hash provided password and compare
6. Bcrypt designed to be slow (prevents brute force)
```

---

## Testing Strategy

### **Unit Tests** (future)
- AI signal extraction
- Risk score calculation
- Trend analysis

### **Integration Tests** (future)
- Check-in → AI → Risk → Alert flow
- User authentication
- Role-based access

### **Manual Testing** (now)
- Postman/Thunder Client for API endpoints
- Database queries with Prisma Studio
- Frontend integration

---

## Deployment Architecture

### **Development**
```
Local machine
├── Frontend: npm run dev (port 3000)
├── Backend: npm run dev (port 3001)
└── Database: PostgreSQL (localhost:5432)
```

### **Staging** (future)
```
Staging server
├── Frontend: Next.js (built)
├── Backend: Node.js (production)
└── Database: PostgreSQL RDS
```

### **Production** (future)
```
Production cluster
├── Load Balancer
├── Backend instances (multiple)
├── Cache layer (Redis)
├── PostgreSQL (primary + replicas)
└── Monitoring & logging
```

---

## Next Steps

**Phase 3**: Authentication
- User registration
- Password hashing with bcrypt
- JWT token generation
- Auth middleware
- Role-based access control

**Phase 4**: Victim & Case Management
- Create victims
- Create cases
- Assign counsellors
- View case details

**Phase 5**: Check-in System
- Submit check-ins
- Store responses
- Retrieve history

**Phase 6**: AI Analysis
- Real LLM integration
- Signal extraction
- Sentiment analysis

**Phase 7**: Risk Engine
- Distress score calculation
- Risk level classification
- Trend analysis

**Phase 8**: Check-in Pipeline
- Complete workflow: Check-in → AI → Risk → Alert

**Phase 9**: Alert System
- Alert creation
- Alert review
- Status transitions

**Phase 10**: Interventions
- Intervention creation
- Status tracking
- History logging

**Phase 11**: Dashboard APIs
- Victim dashboard
- Counsellor dashboard
- Authority analytics

**Phase 12**: Frontend Integration
- Connect frontend to backend APIs
- Replace mock data with real data
