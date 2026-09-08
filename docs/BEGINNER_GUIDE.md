# 🎓 Beginner's Guide to Understanding the Architecture

> **For someone new to coding**: This guide explains how everything works using simple language and visual diagrams.

---

## 📚 Table of Contents

1. [What Is This Project?](#what-is-this-project)
2. [The Big Picture](#the-big-picture)
3. [How Data Flows](#how-data-flows)
4. [Folder Structure Explained](#folder-structure-explained)
5. [Key Concepts](#key-concepts)
6. [Step-by-Step: How a Check-in Works](#step-by-step-how-a-check-in-works)
7. [Understanding the Code](#understanding-the-code)

---

## 🎯 What Is This Project?

### The Problem
Imagine a victim going through legal proceedings. Right now:
- Courts track the **CASE** (legal status)
- Nobody tracks the **PERSON'S well-being**
- Problems are only discovered when it's too late

### Our Solution
This system monitors **BOTH**:
- ✅ Legal case status (traditional)
- ✅ Victim's mental well-being (NEW!)

### How It Helps

```
WITHOUT our system:                WITH our system:
┌──────────────┐                  ┌──────────────┐
│   Victim     │                  │   Victim     │
│  (Silently   │                  │ (Does daily  │
│  suffering)  │                  │  check-in)   │
└──────────────┘                  └──────┬───────┘
       ↓                                  ↓
   Nobody knows                    ┌──────────────┐
       ↓                           │  AI analyzes │
  Crisis happens                   │  responses   │
       ↓                           └──────┬───────┘
  Too late!                                ↓
                                   ┌──────────────┐
                                   │  Counsellor  │
                                   │  gets alert  │
                                   └──────┬───────┘
                                          ↓
                                   Early intervention
                                          ↓
                                    Crisis prevented!
```

---

## 🌍 The Big Picture

### Three Types of Users

```
┌─────────────────────────────────────────────────────────┐
│                    THE SYSTEM                           │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  👤 VICTIM                                              │
│  • Does daily check-ins                                 │
│  • Answers questions about feelings                     │
│  • Gets AI assistant support                            │
│  • Views own well-being trends                          │
│                                                         │
│  👨‍⚕️ COUNSELLOR                                          │
│  • Reviews victim check-ins                             │
│  • Gets alerts when someone is high-risk                │
│  • Decides what action to take                          │
│  • Creates support interventions                        │
│                                                         │
│  👮 AUTHORITY                                            │
│  • Sees overall system statistics                       │
│  • Monitors all cases district-wise                     │
│  • Generates reports                                    │
│  • Tracks system effectiveness                          │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 🔄 How Data Flows

### Think of it like a restaurant:

```
1. CUSTOMER (Victim)
   └─ Places order (Does check-in)
      
2. WAITER (Frontend/UI)
   └─ Takes order to kitchen (Sends data)
      
3. KITCHEN (Backend - Future)
   └─ Cooks food (AI analyzes data)
      
4. WAITER (Frontend/UI)
   └─ Brings food back (Shows results)
      
5. MANAGER (Counsellor)
   └─ Checks quality (Reviews alerts)
```

### Current Architecture (What We Have NOW)

```
┌─────────────────────────────────────────────┐
│           USER'S WEB BROWSER                │
│                                             │
│  ┌───────────────────────────────────────┐ │
│  │  PAGES (What user sees)               │ │
│  │  • Victim dashboard                   │ │
│  │  • Counsellor dashboard               │ │
│  │  • Authority dashboard                │ │
│  └───────────────┬───────────────────────┘ │
│                  │                          │
│  ┌───────────────▼───────────────────────┐ │
│  │  COMPONENTS (Reusable pieces)         │ │
│  │  • Buttons, Cards, Charts             │ │
│  │  • Navigation bars                    │ │
│  │  • Forms and inputs                   │ │
│  └───────────────┬───────────────────────┘ │
│                  │                          │
│  ┌───────────────▼───────────────────────┐ │
│  │  SERVICE LAYER (Gets data)            │ │
│  │  • api.ts functions                   │ │
│  │  • Currently: returns MOCK data       │ │
│  │  • Future: will call real backend     │ │
│  └───────────────┬───────────────────────┘ │
│                  │                          │
│  ┌───────────────▼───────────────────────┐ │
│  │  MOCK DATA (Fake data for demo)       │ │
│  │  • Fake victims                       │ │
│  │  • Fake check-ins                     │ │
│  │  • Fake AI analysis                   │ │
│  └───────────────────────────────────────┘ │
│                                             │
└─────────────────────────────────────────────┘
        ↓
    (Everything happens in browser)
```

### Future Architecture (Production)

```
┌─────────────────────────────────────────────┐
│           USER'S WEB BROWSER                │
│         (Frontend - This project)           │
└───────────────────┬─────────────────────────┘
                    │
                    │ Internet (HTTPS)
                    │
┌───────────────────▼─────────────────────────┐
│         BACKEND SERVER                      │
│         (To be built later)                 │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │  API ENDPOINTS                      │   │
│  │  /api/checkin                       │   │
│  │  /api/victims                       │   │
│  │  /api/alerts                        │   │
│  └──────────────┬──────────────────────┘   │
│                 │                           │
│  ┌──────────────▼──────────────────────┐   │
│  │  AI ANALYSIS ENGINE                 │   │
│  │  • Analyzes responses               │   │
│  │  • Calculates distress score        │   │
│  │  • Detects risk patterns            │   │
│  └──────────────┬──────────────────────┘   │
│                 │                           │
│  ┌──────────────▼──────────────────────┐   │
│  │  DATABASE                           │   │
│  │  • Stores real victim data          │   │
│  │  • Stores check-in history          │   │
│  │  • Stores alerts & interventions    │   │
│  └─────────────────────────────────────┘   │
│                                             │
└─────────────────────────────────────────────┘
```

---

## 📁 Folder Structure Explained

### Like organizing a house:

```
sentinel_prototype/               ← Your house
├── app/                          ← ROOMS (Different pages)
│   ├── page.tsx                  ← Front door (Landing page)
│   ├── login/                    ← Entrance hall
│   ├── victim/                   ← Victim's room
│   │   ├── page.tsx              ← Main dashboard
│   │   ├── check-in/             ← Check-in area
│   │   ├── assistant/            ← AI assistant area
│   │   ├── wellbeing/            ← Well-being tracking
│   │   └── support/              ← Support services
│   ├── counsellor/               ← Counsellor's office
│   │   ├── page.tsx              ← Main dashboard
│   │   ├── cases/                ← Case files
│   │   ├── alerts/               ← Alert center
│   │   └── victims/[id]/         ← Individual victim details
│   └── authority/                ← Authority control room
│       ├── page.tsx              ← Overview dashboard
│       ├── analytics/            ← Analytics center
│       └── reports/              ← Reports area
│
├── components/                   ← FURNITURE (Reusable UI pieces)
│   ├── ui/                       ← Basic furniture
│   │   ├── Button.tsx            ← Clickable buttons
│   │   ├── Card.tsx              ← Info containers
│   │   └── Badge.tsx             ← Status labels
│   ├── layout/                   ← Room layout
│   │   ├── Navbar.tsx            ← Top navigation bar
│   │   ├── Sidebar.tsx           ← Side menu
│   │   └── DashboardLayout.tsx   ← Page wrapper
│   ├── charts/                   ← Display screens
│   │   ├── DistressTrendChart    ← Line chart
│   │   └── RiskDistribution      ← Pie chart
│   └── dashboard/                ← Dashboard widgets
│
├── data/                         ← STORAGE (Mock data files)
│   ├── victims.ts                ← Fake victim profiles
│   ├── cases.ts                  ← Fake case data
│   ├── checkins.ts               ← Fake check-in records
│   └── alerts.ts                 ← Fake alerts
│
├── services/                     ← UTILITIES (Helper functions)
│   └── api.ts                    ← Gets data from "database"
│                                    (Currently mock, future: real)
│
├── types/                        ← BLUEPRINTS (TypeScript types)
│   ├── victim.ts                 ← What a victim looks like
│   ├── case.ts                   ← What a case looks like
│   └── checkin.ts                ← What a check-in looks like
│
├── utils/                        ← TOOLS (Helper functions)
│   └── formatting.ts             ← Format dates, numbers, etc.
│
└── docs/                         ← MANUALS (Documentation)
    ├── ARCHITECTURE.md           ← System design
    ├── FRONTEND_GUIDE.md         ← How to code
    └── UI_FLOW.md                ← User journeys
```

---

## 🔑 Key Concepts

### 1. **What is a "Component"?**

Think of LEGO blocks:
- Each component is a LEGO piece
- You can reuse the same piece many times
- Combine pieces to build something big

Example:
```tsx
// Button component (a LEGO block)
<Button>Click Me</Button>

// You can use it anywhere:
<Button>Save</Button>
<Button>Cancel</Button>
<Button>Submit</Button>
```

### 2. **What is a "Page"?**

A page is what you see when you visit a URL:
- `/victim` → Victim dashboard page
- `/login` → Login page
- `/counsellor/cases` → Counsellor cases page

### 3. **What is "State"?**

State = Memory
- Remembers what the user is doing
- Changes when user interacts
- Updates the screen automatically

Example:
```tsx
// State: Remember if form is open or closed
const [isOpen, setIsOpen] = useState(false);

// When user clicks button:
setIsOpen(true);  // Remember it's open

// Screen updates automatically!
```

### 4. **What is "TypeScript"?**

TypeScript = JavaScript with a safety net
- Tells you WHAT TYPE of data you have
- Catches mistakes BEFORE they happen
- Makes code easier to understand

Example:
```tsx
// Without TypeScript (JavaScript):
let age = "25";           // Is this a number or text? 🤔
age = age + 5;            // Result: "255" (Oops! String concatenation)

// With TypeScript:
let age: number = 25;     // This MUST be a number
age = "25";               // ❌ Error! Can't put text in a number
age = age + 5;            // ✅ Result: 30 (Correct!)
```

### 5. **What is "Mock Data"?**

Mock data = Fake data for testing
- Looks like real data
- Doesn't require a database
- Let's us build UI first, database later

---

## 🎬 Step-by-Step: How a Check-in Works

Let's trace what happens when a victim completes a check-in:

### Step 1: User Clicks "Start Check-in"

```
User Browser
    ↓
  Clicks button on /victim dashboard
    ↓
  Next.js router navigates to /victim/check-in
    ↓
  Check-in page loads
```

**Code location:** `app/victim/page.tsx`
```tsx
<Link href="/victim/check-in">
  <Button>Start Check-in</Button>
</Link>
```

### Step 2: Questions Load

```
Page loads
    ↓
  useEffect() runs (React hook)
    ↓
  Calls getCheckInQuestions() from api.ts
    ↓
  api.ts returns mock questions from data/checkins.ts
    ↓
  Questions stored in component state
    ↓
  Screen shows first question
```

**Code location:** `app/victim/check-in/page.tsx`
```tsx
useEffect(() => {
  async function loadQuestions() {
    // Get questions from service layer
    const questionData = await getCheckInQuestions();
    // Store in state (component memory)
    setQuestions(questionData);
  }
  loadQuestions();
}, []);
```

### Step 3: User Answers Questions

```
For each question:
    User clicks a response button
        ↓
    handleResponse() function runs
        ↓
    Stores answer in responses object
        ↓
    UI updates to show selection
        ↓
    "Next" button becomes enabled
        ↓
    User clicks "Next"
        ↓
    currentStep increases by 1
        ↓
    Next question shows
```

**Code location:** `app/victim/check-in/page.tsx`
```tsx
const handleResponse = (questionId: string, response: ResponseLevel) => {
  // Update the responses object with the new answer
  setResponses(prev => ({
    ...prev,                    // Keep previous answers
    [questionId]: response,     // Add new answer
  }));
};
```

### Step 4: Submit Check-in

```
User clicks "Submit"
    ↓
  handleSubmit() function runs
    ↓
  Format all responses into proper structure
    ↓
  Call submitCheckIn() from api.ts
    ↓
  [Currently] Returns mock result immediately
  [Future] Will send to backend API
    ↓
  Navigate to /victim/check-in/result page
```

**Code location:** `app/victim/check-in/page.tsx`
```tsx
const handleSubmit = async () => {
  // Format the responses
  const formattedResponses = questions.map(q => ({
    questionId: q.id,
    question: q.question,
    response: responses[q.id] || 'NOT_AT_ALL',
    weight: q.weight,
  }));
  
  // Submit to API (currently mock)
  await submitCheckIn({
    victimId: DEMO_USERS.VICTIM.id,
    responses: formattedResponses,
    textResponse,
  });
  
  // Go to results page
  router.push('/victim/check-in/result');
};
```

### Step 5: Show Results

```
Result page loads
    ↓
  Displays mock AI analysis:
    • Distress score (0-100)
    • Risk level (LOW/MODERATE/HIGH/CRITICAL)
    • Detected signals
    • Recommendations
    ↓
  [Future] This would be REAL AI analysis
```

**Code location:** `app/victim/check-in/result/page.tsx`

### Complete Flow Diagram

```
┌─────────────────┐
│ Victim Dashboard│
└────────┬────────┘
         │ Click "Start Check-in"
         ↓
┌─────────────────┐
│ Question 1/8    │
│ (Select answer) │
└────────┬────────┘
         │ Click "Next"
         ↓
┌─────────────────┐
│ Question 2/8    │
│ (Select answer) │
└────────┬────────┘
         │ Continue...
         ↓
┌─────────────────┐
│ Question 8/8    │
│ (Select answer) │
└────────┬────────┘
         │ Click "Continue"
         ↓
┌─────────────────┐
│ Text Input      │
│ (Optional)      │
└────────┬────────┘
         │ Click "Submit"
         ↓
┌─────────────────┐
│ Processing...   │
│ (Shows spinner) │
└────────┬────────┘
         │ Analysis complete
         ↓
┌─────────────────┐
│ Results Page    │
│ • Score: 65     │
│ • Risk: MODERATE│
│ • Signals       │
│ • Tips          │
└────────┬────────┘
         │ Click "Back to Dashboard"
         ↓
┌─────────────────┐
│ Victim Dashboard│
│ (Updated data)  │
└─────────────────┘
```

---

## 💻 Understanding the Code

### Anatomy of a Component

Let's break down a simple component:

```tsx
// ============================================
// Import statements (bring in tools we need)
// ============================================
'use client';                          // This runs in browser
import React, { useState } from 'react'; // React tools
import { Button } from '@/components/ui/Button'; // Our button

// ============================================
// Component function (the actual component)
// ============================================
export default function MyComponent() {
  // ------------------------------------------
  // STATE (component memory)
  // ------------------------------------------
  const [count, setCount] = useState(0);  // Remember a number
  
  // ------------------------------------------
  // FUNCTIONS (what happens on actions)
  // ------------------------------------------
  const handleClick = () => {
    setCount(count + 1);  // Increase count by 1
  };
  
  // ------------------------------------------
  // RENDER (what shows on screen)
  // ------------------------------------------
  return (
    <div className="p-4">
      <h1>Hello!</h1>
      <p>You clicked {count} times</p>
      <Button onClick={handleClick}>
        Click Me
      </Button>
    </div>
  );
}
```

### How Data Flows Between Components

```
Parent Component (Dashboard)
    ↓ (passes data via props)
    ├─→ Child Component 1 (StatCard)
    │      Shows: Total Cases = 45
    │
    ├─→ Child Component 2 (StatCard)
    │      Shows: High Risk = 5
    │
    └─→ Child Component 3 (Chart)
           Shows: Trend graph
```

**Example:**
```tsx
// Parent passes data to children
<StatCard 
  title="Total Cases"     // ← Props (data passed down)
  value={45}
  color="blue"
/>
```

### How API Calls Work

```tsx
// STEP 1: Define what data looks like (TypeScript type)
interface Victim {
  id: string;
  name: string;
  distressScore: number;
}

// STEP 2: Function to get data
export async function getVictim(id: string): Promise<Victim> {
  // Currently: Return mock data
  return {
    id: "V-1001",
    name: "Demo User",
    distressScore: 65
  };
  
  // Future: Call real API
  // const response = await fetch(`/api/victims/${id}`);
  // return response.json();
}

// STEP 3: Use in component
function VictimProfile() {
  const [victim, setVictim] = useState<Victim | null>(null);
  
  useEffect(() => {
    async function loadData() {
      const data = await getVictim("V-1001");
      setVictim(data);  // Store in state
    }
    loadData();
  }, []);
  
  if (!victim) return <p>Loading...</p>;
  
  return <h1>{victim.name}</h1>;
}
```

---

## 🎯 Summary

### What You Learned

1. ✅ **What the system does**: Monitors victim well-being
2. ✅ **Three user types**: Victim, Counsellor, Authority
3. ✅ **How it's organized**: Folders, files, components
4. ✅ **How data flows**: From UI → Service → Mock Data → Back to UI
5. ✅ **How a check-in works**: Step-by-step from start to finish

### Next Steps

To understand more:
1. 📖 Read `FRONTEND_GUIDE.md` for coding details
2. 📖 Read `UI_FLOW.md` for all user journeys
3. 📖 Read `BACKEND_INTEGRATION.md` for API specs
4. 💻 Open a simple component file and read the code
5. 🔍 Use browser DevTools to inspect the running app

### Remember

- **Start small**: Understand one component at a time
- **Use comments**: Read the comments in the code
- **Ask questions**: Every expert was once a beginner
- **Practice**: The best way to learn is by doing

---

**Happy Learning! 🚀**
