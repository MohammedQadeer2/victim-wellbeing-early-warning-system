# Sentinel Database Schema

## Overview

The Sentinel backend uses PostgreSQL with Prisma ORM. The database stores all system data with special emphasis on **longitudinal data** - tracking changes over time.

## Core Principle: Longitudinal Data

**NEVER overwrite data. Always append new records.**

Why? The entire innovation depends on detecting trends:
- June: Distress = 42
- July: Distress = 57
- August: Distress = 71
- **Trend: INCREASING**

Each check-in is stored as a separate record with its own AI analysis and risk assessment.

## 8 Core Entities

### 1. **User** - Authentication & Identity
Represents someone who can log into the system.

```
Users
├── id (primary key)
├── email (unique)
├── name
├── passwordHash (never plain text)
├── role (VICTIM, COUNSELLOR, AUTHORITY)
├── createdAt
└── updatedAt
```

**Relationships:**
- Can be assigned to many Cases (if COUNSELLOR)
- Can create/review Interventions
- Can review Alerts

**Roles:**
- **VICTIM**: Person who experienced a crime
- **COUNSELLOR**: Mental health professional
- **AUTHORITY**: Police/government official

---

### 2. **Victim** - Case Subject
Represents a person who is the subject of a case.

```
Victims
├── id
├── referenceId (FIR/case registration number)
├── age
├── gender
├── createdAt
└── updatedAt
```

**Relationships:**
- Has many Cases

---

### 3. **Case** - Legal Case
Represents a legal case involving a victim.

```
Cases
├── id
├── victimId (foreign key)
├── caseNumber (unique)
├── title
├── description
├── status (ACTIVE, CLOSED, SUSPENDED)
├── assignedCounsellorId (optional)
├── createdAt
└── updatedAt
```

**Relationships:**
- Belongs to one Victim
- Assigned to one Counsellor (optional)
- Has many CheckIns
- Has many Alerts
- Has many Interventions

**Status:**
- **ACTIVE**: Case is ongoing
- **CLOSED**: Case has concluded
- **SUSPENDED**: Case is temporarily paused

---

### 4. **CheckIn** - Periodic Assessment
**CRITICAL FOR LONGITUDINAL ANALYSIS**

Represents a victim completing the periodic well-being questionnaire.

```
CheckIns
├── id
├── caseId (foreign key)
├── responses (JSON)
├── textResponse (free text)
├── source (WEB, CHATBOT, SMS, IVRS, MOBILE_APP)
├── createdAt
└── (no updatedAt - immutable)
```

**IMPORTANT RULES:**
- Never update a check-in
- Always create new records
- Timestamps are indexed for trend queries
- Responses stored as JSON for flexibility

**Relationships:**
- Belongs to one Case
- Has one AIAnalysis
- Has one RiskAssessment

**Source:**
- **WEB**: Filled through web interface
- **CHATBOT**: From AI assistant conversation
- **SMS**: Future SMS check-ins
- **IVRS**: Future automated phone calls
- **MOBILE_APP**: Future mobile app

---

### 5. **AIAnalysis** - Signal Extraction
AI extracts structured signals from check-in responses.

```
AIAnalyses
├── id
├── checkInId (unique - one-to-one)
├── signals (array of strings)
├── sentiment (positive, negative, neutral, mixed)
├── emotions (array of strings)
├── rawResponse (JSON, for debugging)
├── createdAt
└── (no updatedAt - immutable)
```

**Example Output:**
```json
{
  "signals": ["Threat detected", "Severe fear", "Safety concern"],
  "sentiment": "negative",
  "emotions": ["fear", "anxiety", "helplessness"]
}
```

**Relationships:**
- Belongs to one CheckIn
- Leads to one RiskAssessment

**Why Separate?**
- AI layer is isolated from risk calculation
- Easy to replace AI provider
- Explainability: see raw signal extraction
- Can add confidence scores later

---

### 6. **RiskAssessment** - Distress Calculation
Calculates the victim's distress score based on signals.

```
RiskAssessments
├── id
├── checkInId (unique - one-to-one)
├── distressScore (0-100)
├── riskLevel (LOW, MODERATE, HIGH, CRITICAL)
├── trend (STABLE, INCREASING, DECREASING, FLUCTUATING)
├── escalationRisk (LOW, MODERATE, HIGH, CRITICAL)
├── reasons (array of strings)
├── createdAt
└── (no updatedAt - immutable)
```

**Distress Score Mapping:**
- 0-30: LOW
- 31-60: MODERATE
- 61-80: HIGH
- 81-100: CRITICAL

**Trend Analysis:**
- **STABLE**: Score hasn't changed much
- **INCREASING**: Score is going up (worsening)
- **DECREASING**: Score is going down (improving)
- **FLUCTUATING**: High variability

**Escalation Risk:**
Predicts whether the situation will get worse:
- Based on: current score + trend + severity of signals
- Used to prioritize alerts

**Relationships:**
- Belongs to one CheckIn
- May trigger one Alert

**Why Separate from AI?**
- Risk engine has deterministic logic
- Easy to modify scoring algorithm
- Same signals always produce same score
- Explainable to counsellors

---

### 7. **Alert** - High-Risk Flag
Created when risk assessment indicates HIGH or CRITICAL risk.

```
Alerts
├── id
├── caseId (foreign key)
├── riskAssessmentId (unique - one-to-one)
├── distressScore
├── reasons (array)
├── status (OPEN, ACKNOWLEDGED, REVIEWED, RESOLVED, DISMISSED)
├── reviewedBy (User who reviewed, optional)
├── reviewedById (User ID)
├── reviewedAt
├── createdAt
└── updatedAt
```

**Status Lifecycle:**
1. **OPEN**: Just created, needs review
2. **ACKNOWLEDGED**: Someone saw it
3. **REVIEWED**: Counsellor reviewed and decided on action
4. **RESOLVED**: Case stabilized or support provided
5. **DISMISSED**: Determined to be false positive

**Relationships:**
- Belongs to one Case
- Links to one RiskAssessment
- Can trigger multiple Interventions
- Reviewed by one User (optional)

**Important:**
- AI creates the alert
- **HUMANS review and decide actions**
- AI does NOT take autonomous action

---

### 8. **Intervention** - Support Action
Represents support actions taken for a victim.

```
Interventions
├── id
├── alertId (optional - can create without alert)
├── caseId (foreign key)
├── category (type of support)
├── description
├── assignedBy (User ID)
├── status (RECOMMENDED, IN_PROGRESS, COMPLETED, NEEDS_REVIEW, CANCELLED)
├── notes
├── createdAt
└── updatedAt
```

**Categories:**
- **COUNSELLING**: Mental health counseling
- **SAFETY_ASSESSMENT**: Physical safety evaluation
- **LEGAL_ASSISTANCE**: Legal aid
- **FINANCIAL_ASSISTANCE**: Economic support
- **REHABILITATION_SUPPORT**: Rehabilitation services
- **PROTECTION_RELOCATION_REVIEW**: Consider protection/relocation
- **OTHER**: Other support

**Status:**
- **RECOMMENDED**: Proposed by counsellor
- **IN_PROGRESS**: Support being provided
- **COMPLETED**: Support ended
- **NEEDS_REVIEW**: Requires follow-up
- **CANCELLED**: Support cancelled

**Relationships:**
- Optional link to Alert
- Belongs to one Case
- Created by one User

---

## Entity Relationships Diagram

```
User
  ├── (COUNSELLOR)
  │   └── Case (assignedCounsellor)
  ├── Intervention (assignedBy)
  └── Alert (reviewedBy)

Victim
  └── Case (many)

Case
  ├── Victim
  ├── User (counsellor)
  ├── CheckIn (many)
  │   ├── AIAnalysis (one)
  │   └── RiskAssessment (one)
  │       └── Alert (one, optional)
  │           ├── Intervention (many)
  │           └── User (reviewer)
  ├── Alert (many)
  └── Intervention (many)
```

---

## Data Flow Example

### Scenario: Victim Completes Check-in

**Step 1: CheckIn Created**
```
Victim completes questionnaire
  ↓
POST /check-ins
  ↓
CheckIn record stored
```

**Step 2: AI Analysis**
```
CheckIn data
  ↓
AI analyzes responses
  ↓
AIAnalysis record created
  ├── signals: ["Threat detected", "Severe fear"]
  ├── sentiment: "negative"
  └── emotions: ["fear", "anxiety"]
```

**Step 3: Risk Assessment**
```
AIAnalysis signals
  ↓
Risk engine calculates
  ↓
RiskAssessment record created
  ├── distressScore: 82
  ├── riskLevel: "HIGH"
  ├── trend: "INCREASING"
  └── reasons: ["Threat detected", "Fear", "Score increased from 71"]
```

**Step 4: Alert (if HIGH/CRITICAL)**
```
RiskAssessment riskLevel = HIGH
  ↓
Alert created
  ├── status: "OPEN"
  ├── distressScore: 82
  └── reasons: same as risk assessment
```

**Step 5: Human Review**
```
Counsellor sees alert
  ↓
Reviews case and signals
  ↓
Decides on intervention
  ↓
Updates Alert status
  ↓
Creates Intervention record
  ├── category: "SAFETY_ASSESSMENT"
  └── status: "RECOMMENDED"
```

---

## Indexing Strategy

Indexes optimize common queries:

```
CheckIn:
  ├── caseId (find check-ins for a case)
  └── createdAt (trend analysis queries)

RiskAssessment:
  ├── riskLevel (find HIGH/CRITICAL cases)
  ├── createdAt (trend analysis)
  └── checkInId (link to check-in)

Alert:
  ├── caseId (find alerts for a case)
  ├── status (find open alerts)
  └── createdAt (recent alerts)

Case:
  ├── victimId (find cases for a victim)
  ├── assignedCounsellorId (find assigned cases)
  └── status (find active cases)
```

---

## Timestamps & Audit Trails

- **createdAt**: Immutable - when record was created
- **updatedAt**: Changes when record is modified
- **reviewedAt**: When alert was reviewed

These enable audit trails and compliance tracking.

---

## JSON Fields

Some fields use JSON for flexibility:

**CheckIn.responses**
```json
{
  "q1": "SOMEWHAT_AGREE",
  "q2": "DISAGREE",
  "q3": "STRONGLY_AGREE",
  "q4_text": "I'm worried about..."
}
```

**AIAnalysis.rawResponse**
```json
{
  "model": "gpt-4",
  "confidence": 0.92,
  "raw_output": "..."
}
```

This allows the system to evolve without schema changes.

---

## Migration Safety

When changing the schema:
1. Never delete tables (data loss)
2. Always use `onDelete: Cascade` for sensitive relationships
3. Add indexes before querying new columns
4. Test migrations on staging first
5. Keep old columns until migration is complete

---

## Testing the Schema

Once database is set up:

```bash
# Run migrations
npx prisma migrate dev --name init

# Generate Prisma client
npx prisma generate

# View database in GUI
npx prisma studio

# Reset database (dev only!)
npx prisma migrate reset
```

---

## Next Steps

Phase 3 will create APIs to:
- INSERT new check-ins
- INSERT AI analyses
- INSERT risk assessments
- CREATE alerts automatically
- QUERY case history for trends
