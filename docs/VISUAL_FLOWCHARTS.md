# 📊 Visual Flowcharts & Diagrams

> **Visual representations** of how the system works - easier to understand than text!

---

## 🎯 System Overview

### The Complete System at a Glance

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                   SENTINEL SYSTEM                       ┃
┃          Mental Health Monitoring Platform              ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
┌───────────────┐  ┌───────────────┐  ┌───────────────┐
│   👤 VICTIM   │  │ 👨‍⚕️ COUNSELLOR│  │ 👮 AUTHORITY  │
├───────────────┤  ├───────────────┤  ├───────────────┤
│• Check-ins    │  │• Reviews cases│  │• Overview     │
│• AI Assistant │  │• Gets alerts  │  │• Analytics    │
│• Track mood   │  │• Takes action │  │• Reports      │
│• Get support  │  │• Monitors     │  │• Compliance   │
└───────────────┘  └───────────────┘  └───────────────┘
        │                  │                  │
        └──────────────────┼──────────────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │   SHARED DATA   │
                  │                 │
                  │ • Cases         │
                  │ • Check-ins     │
                  │ • Alerts        │
                  │ • Interventions │
                  └─────────────────┘
```

---

## 🔄 Data Flow Architecture

### Current System (Frontend Only)

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃             WEB BROWSER (User's Computer)        ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                                  ┃
┃  ┌────────────────────────────────────────────┐ ┃
┃  │  LAYER 1: PAGES                            │ ┃
┃  │  ┌──────────┐ ┌──────────┐ ┌──────────┐   │ ┃
┃  │  │ Victim   │ │Counsellor│ │Authority │   │ ┃
┃  │  │ Pages    │ │  Pages   │ │  Pages   │   │ ┃
┃  │  └──────────┘ └──────────┘ └──────────┘   │ ┃
┃  └────────────────┬───────────────────────────┘ ┃
┃                   │                             ┃
┃  ┌────────────────▼───────────────────────────┐ ┃
┃  │  LAYER 2: COMPONENTS                       │ ┃
┃  │  ┌────────┐ ┌────────┐ ┌────────┐         │ ┃
┃  │  │Buttons │ │ Cards  │ │ Charts │ ...     │ ┃
┃  │  └────────┘ └────────┘ └────────┘         │ ┃
┃  └────────────────┬───────────────────────────┘ ┃
┃                   │                             ┃
┃  ┌────────────────▼───────────────────────────┐ ┃
┃  │  LAYER 3: SERVICE LAYER (api.ts)           │ ┃
┃  │                                             │ ┃
┃  │  getVictimDashboard()                      │ ┃
┃  │  getCounsellorCases()                      │ ┃
┃  │  submitCheckIn()                           │ ┃
┃  │         │                                   │ ┃
┃  │         │ (Currently returns mock data)    │ ┃
┃  │         ▼                                   │ ┃
┃  └────────────────┬───────────────────────────┘ ┃
┃                   │                             ┃
┃  ┌────────────────▼───────────────────────────┐ ┃
┃  │  LAYER 4: MOCK DATA                        │ ┃
┃  │                                             │ ┃
┃  │  victims.ts    cases.ts    alerts.ts       │ ┃
┃  │  [Fake data stored in memory]              │ ┃
┃  └────────────────────────────────────────────┘ ┃
┃                                                  ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

### Future System (With Backend)

```
┌─────────────────────────────────────────────────┐
│         FRONTEND (Browser)                      │
│         ↕ HTTP/REST API                         │
└─────────────────┬───────────────────────────────┘
                  │
                  │ HTTPS (Secure Internet)
                  │
┌─────────────────▼───────────────────────────────┐
│         BACKEND SERVER                          │
│                                                 │
│  ┌───────────────────────────────────────────┐ │
│  │  API Routes                               │ │
│  │  POST /api/checkin                        │ │
│  │  GET  /api/victims/:id                    │ │
│  │  GET  /api/alerts                         │ │
│  └──────────────┬────────────────────────────┘ │
│                 │                               │
│  ┌──────────────▼────────────────────────────┐ │
│  │  Business Logic                           │ │
│  │  • Validate data                          │ │
│  │  • Process check-ins                      │ │
│  │  • Generate alerts                        │ │
│  └──────────────┬────────────────────────────┘ │
│                 │                               │
│  ┌──────────────▼────────────────────────────┐ │
│  │  AI Engine                                │ │
│  │  • Analyze responses                      │ │
│  │  • Calculate distress score               │ │
│  │  • Detect risk patterns                   │ │
│  │  • Generate explanations                  │ │
│  └──────────────┬────────────────────────────┘ │
│                 │                               │
│  ┌──────────────▼────────────────────────────┐ │
│  │  DATABASE (PostgreSQL)                    │ │
│  │                                            │ │
│  │  Tables:                                   │ │
│  │  • victims                                 │ │
│  │  • cases                                   │ │
│  │  • checkins                                │ │
│  │  • alerts                                  │ │
│  │  • interventions                           │ │
│  └────────────────────────────────────────────┘ │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 🎯 Complete Check-in Journey

### Victim Check-in Flow (Detailed)

```
START
  │
  ▼
┌─────────────────────┐
│ User logs in        │
│ as VICTIM           │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Victim Dashboard    │◄──────────────────┐
│                     │                   │
│ Shows:              │                   │
│ • Current score: 65 │                   │
│ • Trend: Stable     │                   │
│ • Last check: 2d ago│                   │
└──────────┬──────────┘                   │
           │                              │
           │ Clicks "Start Check-in"      │
           ▼                              │
┌─────────────────────┐                   │
│ Loading Questions   │                   │
│ [Spinner shows]     │                   │
└──────────┬──────────┘                   │
           │                              │
           │ Questions loaded             │
           ▼                              │
┌─────────────────────┐                   │
│ Question 1 of 8     │                   │
│                     │                   │
│ "How often have you │                   │
│  felt sad?"         │                   │
│                     │                   │
│ Options:            │                   │
│ ○ Not at all        │                   │
│ ○ Several days      │                   │
│ ○ More than half    │                   │
│ ○ Nearly every day  │                   │
└──────────┬──────────┘                   │
           │                              │
           │ User selects "Several days"  │
           ▼                              │
┌─────────────────────┐                   │
│ Response saved!     │                   │
│ "Next" button       │                   │
│ becomes active      │                   │
└──────────┬──────────┘                   │
           │                              │
           │ Clicks "Next"                │
           ▼                              │
┌─────────────────────┐                   │
│ Question 2 of 8     │                   │
│ ...                 │                   │
│ [Repeat for all 8]  │                   │
└──────────┬──────────┘                   │
           │                              │
           │ After question 8             │
           ▼                              │
┌─────────────────────┐                   │
│ Additional Info     │                   │
│ (Optional)          │                   │
│                     │                   │
│ "Anything else to   │                   │
│  share?"            │                   │
│                     │                   │
│ [Text area]         │                   │
└──────────┬──────────┘                   │
           │                              │
           │ Clicks "Submit"              │
           ▼                              │
┌─────────────────────┐                   │
│ Processing...       │                   │
│                     │                   │
│ [Spinner shows]     │                   │
│ "Analyzing your     │                   │
│  responses..."      │                   │
└──────────┬──────────┘                   │
           │                              │
           │ Analysis complete            │
           ▼                              │
┌─────────────────────┐                   │
│ RESULTS PAGE        │                   │
│                     │                   │
│ ✓ Check-in Complete │                   │
│                     │                   │
│ Your Score: 65      │                   │
│ Risk: MODERATE      │                   │
│ Trend: STABLE       │                   │
│                     │                   │
│ Signals Detected:   │                   │
│ • Emotional distress│                   │
│ • Sleep issues      │                   │
│                     │                   │
│ Recommendations:    │                   │
│ → Continue check-ins│                   │
│ → Try relaxation    │                   │
│ → Call if worse     │                   │
└──────────┬──────────┘                   │
           │                              │
           │ Clicks "Back to Dashboard"   │
           └──────────────────────────────┘
```

---

## 👨‍⚕️ Counsellor Alert Response Flow

```
START (Background Process)
  │
  │ Victim completes check-in
  │ AI detects HIGH RISK
  │
  ▼
┌─────────────────────┐
│ ALERT GENERATED     │
│                     │
│ Type: HIGH_RISK     │
│ Victim: V-1001      │
│ Score: 85           │
│ Signals: Multiple   │
└──────────┬──────────┘
           │
           │ System notifies counsellor
           ▼
┌─────────────────────┐
│ COUNSELLOR          │
│ sees notification   │
│                     │
│ 🔴 NEW ALERT        │
│ "High-risk case     │
│  needs review"      │
└──────────┬──────────┘
           │
           │ Clicks notification
           ▼
┌─────────────────────┐
│ ALERT DETAILS PAGE  │
│                     │
│ Victim: Priya S.    │
│ Score: 85 (↑ from 65│
│ Risk: HIGH          │
│ Trend: WORSENING    │
│                     │
│ 🤖 WHY FLAGGED:     │
│ • Score jumped 20pts│
│ • Mentioned self-   │
│   harm ideation     │
│ • Sleep disturbance │
│ • Social withdrawal │
└──────────┬──────────┘
           │
           │ Clicks "Review Case"
           ▼
┌─────────────────────┐
│ VICTIM DETAIL PAGE  │
│                     │
│ Full Profile:       │
│ • Demographics      │
│ • Case info         │
│ • Complete history  │
│ • All check-ins     │
│ • Trend chart       │
│                     │
│ 🤖 AI EXPLANATION:  │
│                     │
│ "This case flagged  │
│  because..."        │
│                     │
│ Risk Factors:       │
│ 1. Rapid deteriora- │
│    tion (HIGH)      │
│ 2. Ideation present │
│    (CRITICAL)       │
│ 3. Low support      │
│    (MODERATE)       │
│                     │
│ Recommended Actions:│
│ → Immediate contact │
│ → Safety assessment │
│ → Escalate if needed│
└──────────┬──────────┘
           │
           ▼
    ╔══════════════════╗
    ║ DECISION POINT   ║
    ╚══════┬═══════════╝
           │
    ┌──────┴──────┐
    │             │
    ▼             ▼
┌─────────┐  ┌─────────┐
│ Option A│  │ Option B│
│         │  │         │
│ Create  │  │ Mark as │
│ Interv- │  │ reviewed│
│ ention  │  │ (Minor) │
└────┬────┘  └────┬────┘
     │            │
     ▼            │
┌─────────────────┤
│ INTERVENTION    │
│ FORM            │
│                 │
│ Type:           │
│ ☑ Phone call    │
│ ☑ Counselling   │
│ ☐ Home visit    │
│                 │
│ Priority: HIGH  │
│                 │
│ Notes:          │
│ [Text area]     │
│                 │
│ Schedule:       │
│ [Date/time]     │
└────┬────────────┘
     │
     │ Clicks "Create"
     ▼
┌─────────────────┐
│ ✓ INTERVENTION  │
│   CREATED       │
│                 │
│ • Logged in     │
│   system        │
│ • Calendar event│
│ • Victim        │
│   notified      │
└────┬────────────┘
     │
     ▼
   END
```

---

## 📊 Authority Monitoring Flow

```
┌─────────────────────────────────────────────┐
│  AUTHORITY DASHBOARD                        │
│  (Real-time System Overview)                │
├─────────────────────────────────────────────┤
│                                             │
│  ┏━━━━━━━━━━━┓  ┏━━━━━━━━━━━┓             │
│  ┃  METRICS  ┃  ┃  CHARTS   ┃             │
│  ┗━━━━━━━━━━━┛  ┗━━━━━━━━━━━┛             │
│                                             │
│  Total Cases: 124                           │
│  ├─ LOW:      89 (72%)  🟢                  │
│  ├─ MODERATE: 25 (20%)  🟡                  │
│  ├─ HIGH:     8  (6%)   🟠                  │
│  └─ CRITICAL: 2  (2%)   🔴                  │
│                                             │
│  [═════ Risk Distribution Chart ═════]      │
│      🟢 72%                                  │
│      🟡 20%                                  │
│      🟠 6%                                   │
│      🔴 2%                                   │
│                                             │
│  Today's Activity:                          │
│  • Check-ins received: 45                   │
│  • New alerts: 3                            │
│  • Interventions: 7                         │
│                                             │
├─────────────────────────────────────────────┤
│  Quick Actions:                             │
│  [View High-Risk] [Analytics] [Reports]     │
└─────────────────────────────────────────────┘
         │              │              │
         │              │              │
         ▼              ▼              ▼
    ┌────────┐   ┌─────────┐   ┌─────────┐
    │High-   │   │Analytics│   │ Reports │
    │Risk    │   │         │   │         │
    │Cases   │   │District │   │Generate │
    │        │   │Breakdown│   │PDF      │
    └────────┘   └─────────┘   └─────────┘
```

---

## 🗂️ Component Hierarchy

### How Pages Are Built from Components

```
┌──────────────────────────────────────────────┐
│         VICTIM DASHBOARD PAGE                │
│         (app/victim/page.tsx)                │
└──────────────────┬───────────────────────────┘
                   │
    ┌──────────────┴──────────────┐
    │ DashboardLayout             │
    │ (Wrapper with nav)          │
    └──────────────┬──────────────┘
                   │
    ┌──────────────┴──────────────┐
    │                             │
    ▼                             ▼
┌─────────┐                 ┌─────────┐
│ Navbar  │                 │ Sidebar │
│ (Top)   │                 │ (Left)  │
└─────────┘                 └─────────┘
                                 │
                                 │
                   ┌─────────────┴──────────────┐
                   │  Main Content Area          │
                   └─────────────┬───────────────┘
                                 │
                                 │
            ┌────────────────────┼────────────────────┐
            │                    │                    │
            ▼                    ▼                    ▼
      ┌──────────┐         ┌──────────┐       ┌──────────┐
      │ PageHead │         │ StatCard │       │DistTrend │
      │  er      │         │  x3      │       │  Chart   │
      └──────────┘         └──────────┘       └──────────┘
                                 │
                                 │
                                 ▼
                          ┌──────────┐
                          │ Cards    │
                          │ (various)│
                          └──────────┘
                                 │
                                 │
                                 ▼
                          ┌──────────┐
                          │ Buttons  │
                          │ (actions)│
                          └──────────┘
```

### Component Reusability

```
┌─────────────────────────────────────────────┐
│  ONE COMPONENT, USED MANY TIMES             │
│  (Button Component Example)                 │
└─────────────────────────────────────────────┘

Button Component Definition:
┌─────────────────────────────────┐
│  <Button variant color size>    │
│    {children}                    │
│  </Button>                       │
└─────────────────────────────────┘
              │
              │ Used in...
              │
    ┌─────────┼─────────┬─────────┐
    │         │         │         │
    ▼         ▼         ▼         ▼
┌────────┐┌────────┐┌────────┐┌────────┐
│Victim  ││Counsel-││Authori-││Everywh-│
│pages   ││lor pgs ││ty pages││ere!    │
└────────┘└────────┘└────────┘└────────┘

Examples:
<Button variant="primary">Save</Button>
<Button variant="danger">Delete</Button>
<Button variant="secondary" size="sm">Cancel</Button>
```

---

## 🔐 Security & Access Control (Future)

```
┌─────────────────────────────────────────────┐
│             USER LOGIN                       │
└───────────────────┬─────────────────────────┘
                    │
                    │ Authenticate
                    ▼
┌─────────────────────────────────────────────┐
│  AUTHENTICATION SERVER                      │
│  • Verify credentials                       │
│  • Generate JWT token                       │
│  • Token contains: user ID, role, expiry    │
└───────────────────┬─────────────────────────┘
                    │
                    │ Token issued
                    ▼
┌─────────────────────────────────────────────┐
│  USER'S BROWSER                             │
│  • Stores token securely                    │
│  • Includes in all API requests             │
└───────────────────┬─────────────────────────┘
                    │
                    │ API Request + Token
                    ▼
┌─────────────────────────────────────────────┐
│  BACKEND API                                │
│  ┌───────────────────────────────────────┐ │
│  │  1. Verify token valid                │ │
│  │  2. Check token not expired           │ │
│  │  3. Extract user role                 │ │
│  └───────────────┬───────────────────────┘ │
│                  │                          │
│                  ▼                          │
│  ┌───────────────────────────────────────┐ │
│  │  AUTHORIZATION CHECK                  │ │
│  │                                       │ │
│  │  If role = "VICTIM":                  │ │
│  │    ✓ Can access own data              │ │
│  │    ✗ Cannot access others' data       │ │
│  │                                       │ │
│  │  If role = "COUNSELLOR":              │ │
│  │    ✓ Can access assigned cases        │ │
│  │    ✗ Cannot access unassigned cases   │ │
│  │                                       │ │
│  │  If role = "AUTHORITY":               │ │
│  │    ✓ Can view all case statistics     │ │
│  │    ✗ Cannot view individual victim    │ │
│  │      sensitive details                │ │
│  └───────────────┬───────────────────────┘ │
│                  │                          │
│                  ▼                          │
│          [Return Data]                      │
└─────────────────────────────────────────────┘
```

---

## 📱 Responsive Design Flow

```
┌─────────────────────────────────────────────┐
│  SAME PAGE, DIFFERENT DEVICES               │
└─────────────────────────────────────────────┘

DESKTOP (> 1024px):
┌─────────────────────────────────────────────┐
│ [Navbar──────────────────────────────────]  │
├──────┬──────────────────────────────────────┤
│ Side │  Main Content Area                   │
│ bar  │                                      │
│      │  ┌────┐ ┌────┐ ┌────┐               │
│ Nav  │  │Card│ │Card│ │Card│ (3 columns)   │
│ Menu │  └────┘ └────┘ └────┘               │
│      │                                      │
│      │  [Chart────────────────]             │
│      │                                      │
└──────┴──────────────────────────────────────┘


TABLET (768px - 1024px):
┌─────────────────────────────────────────────┐
│ [Navbar──────────] [☰ Menu]                 │
├─────────────────────────────────────────────┤
│  Main Content (Full width when menu hidden) │
│                                             │
│  ┌──────────┐ ┌──────────┐                 │
│  │  Card    │ │  Card    │ (2 columns)     │
│  └──────────┘ └──────────┘                 │
│                                             │
│  [Chart──────────────]                      │
│                                             │
└─────────────────────────────────────────────┘


MOBILE (< 768px):
┌────────────────────────┐
│ [Nav] [☰]              │
├────────────────────────┤
│ Main Content           │
│                        │
│ ┌────────────────────┐ │
│ │     Card           │ │
│ └────────────────────┘ │
│                        │
│ ┌────────────────────┐ │
│ │     Card           │ │
│ └────────────────────┘ │
│                        │  (1 column,
│ ┌────────────────────┐ │   stacked)
│ │     Card           │ │
│ └────────────────────┘ │
│                        │
│ [Chart──────────]      │
│                        │
└────────────────────────┘
```

---

## 🎯 Key Takeaways

### Data Flow Summary
1. **User** interacts with **Page**
2. **Page** uses **Components**
3. **Components** call **Service Layer**
4. **Service Layer** gets data (mock or real)
5. Data flows back up: Service → Component → Page → User

### Component Structure
- **Small pieces** that combine to make **big pages**
- **Reusable** across different pages
- **Independent** but can communicate

### Roles & Access
- **Victims** see their own data only
- **Counsellors** see assigned cases
- **Authorities** see system overview

---

**Use these flowcharts as reference when building or understanding features!** 🚀
