# User Interface Flow

## Landing Page Flow

```
Landing Page (/)
├── Hero Section
├── How It Works
├── Features
└── Login CTA
    ↓
Login Page (/login)
├── Select Role:
│   ├── Victim → /victim
│   ├── Counsellor → /counsellor
│   └── Authority → /authority
```

## Victim User Journey

### Main Flow

```
1. Login as Victim
   ↓
2. Victim Dashboard (/victim)
   └── Shows:
       • Current distress score
       • Recent signals
       • Well-being trend chart
       • Quick actions
   ↓
3. User Actions:
   ├── Start Check-in → /victim/check-in
   ├── View Well-being → /victim/wellbeing
   ├── Check History → /victim/history
   ├── AI Assistant → /victim/assistant
   └── Get Support → /victim/support
```

### Check-in Flow (Critical Path)

```
/victim/check-in
├── Question 1 of 8
│   └── Select response level
├── Question 2 of 8
│   └── Select response level
├── ... (continue for all questions)
├── Additional text input (optional)
└── Submit
    ↓
Processing (AI Analysis simulation)
    ↓
/victim/check-in/result
└── Display:
    • Distress score
    • Risk level
    • Detected signals
    • Recommendations
    • Support options
```

### Well-being Tracking Flow

```
/victim/wellbeing
└── Shows:
    • Current score
    • Trend (increasing/decreasing/stable)
    • Longitudinal chart
    • Check-in summary
```

## Counsellor User Journey

### Main Flow

```
1. Login as Counsellor
   ↓
2. Counsellor Dashboard (/counsellor)
   └── Shows:
       • Assigned cases count
       • High-risk cases
       • Unread alerts
       • Cases requiring attention (table)
   ↓
3. User Actions:
   ├── View All Cases → /counsellor/cases
   ├── Review Alerts → /counsellor/alerts
   ├── Manage Interventions → /counsellor/interventions
   └── Check Notifications → /counsellor/notifications
```

### Case Review Flow (Critical Path)

```
/counsellor/cases
├── Select a case
    ↓
/counsellor/victims/[id]
└── Shows:
    • Victim information
    • Case details
    • Current distress status
    • 🤖 AI EXPLAINABILITY SECTION
      ├── Why was this case flagged?
      ├── Risk assessment factors
      └── Recommended actions
    • Detected signals (detailed)
    • Distress trend chart
    • Interventions history
    • Recent alerts
    ↓
Decision Points:
├── Create Intervention
├── Contact Victim
└── Mark as Reviewed
```

### Alert Management Flow

```
/counsellor/alerts
├── Filter: All | New | Reviewed
├── Select an alert
    └── Shows:
        • Alert details
        • Victim information
        • Why generated (explainability)
        • Metadata (distress, risk, trend)
    ↓
Actions:
├── Review Case → Go to victim detail
└── Acknowledge Alert
```

## Authority User Journey

### Main Flow

```
1. Login as Authority
   ↓
2. Authority Dashboard (/authority)
   └── Shows:
       • Total active cases
       • Risk distribution (chart)
       • Risk breakdown (numbers)
       • System activity metrics
   ↓
3. User Actions:
   ├── View All Cases → /authority/cases
   ├── Review High-Risk → /authority/high-risk
   ├── Check Alerts → /authority/alerts
   ├── View Analytics → /authority/analytics
   └── Generate Reports → /authority/reports
```

### Analytics Flow

```
/authority/analytics
└── Shows:
    • Key metrics (cases, distress, alerts, compliance)
    • Risk distribution chart
    • District-wise breakdown table
    • Trend analysis
```

### Reporting Flow

```
/authority/reports
└── Shows:
    • Current period summary
    • Report metrics
    • Available report types:
      ├── Monthly Summary
      ├── High-Risk Cases
      ├── District-wise
      └── Intervention Effectiveness
    ↓
Generate Report (Demo)
└── Would produce downloadable report
```

## Navigation Patterns

### Breadcrumb Navigation

Used in detail pages:

```
Counsellor > Cases > Victim Detail
Authority > High-Risk > Case Detail
```

### Sidebar Navigation

Always visible on dashboard pages:
- Current page highlighted
- Clear visual hierarchy
- Role-specific items

### Back Navigation

- Browser back button works correctly
- Explicit "Back to..." links where appropriate

## Information Hierarchy

### Dashboard Pages

1. **Page Header**: Title + Description
2. **Alert Banner**: If urgent items
3. **Key Metrics**: 2-4 stat cards
4. **Main Content**: Tables, charts, cards
5. **Quick Actions**: Common tasks

### Detail Pages

1. **Page Header**: Title + Breadcrumbs + Actions
2. **Summary Cards**: Key information
3. **Main Content**: Detailed information
4. **Related Items**: Associated data

## Visual Feedback

### Loading States

- Spinner while fetching data
- Skeleton loaders for cards
- "Loading..." text for clarity

### Success States

- Green checkmark
- Success message
- Confirmation feedback

### Error States

- Red error icon
- Error message
- Suggested actions

### Empty States

- Friendly icon
- Explanatory text
- Call-to-action if applicable

## Responsive Behavior

### Mobile (< 768px)

- Single column layouts
- Hamburger menu for navigation
- Stacked cards
- Simplified tables (or cards instead)
- Larger touch targets

### Tablet (768px - 1024px)

- 2-column layouts
- Sidebar toggleable
- Responsive tables
- Balanced information density

### Desktop (> 1024px)

- Multi-column layouts
- Persistent sidebar
- Full tables
- Maximum information density

## Accessibility Flow

### Keyboard Navigation

1. Tab through interactive elements
2. Enter/Space to activate
3. Escape to close modals
4. Arrow keys in forms

### Screen Reader Support

- Semantic HTML
- ARIA labels
- Role attributes
- Live regions for updates

## Error Recovery

### Network Errors

```
Error State
└── Message: "Unable to load data"
└── Action: "Try Again" button
    ↓
Retry data fetch
```

### Form Errors

```
Form Submission
└── Validation Error
    └── Highlight field
    └── Show error message
    └── Focus on first error
```

## Critical User Paths

### 1. Victim Completes Check-in

Time: ~3-5 minutes

```
Dashboard → Check-in → Answer 8 questions → 
Optional text → Submit → View results → Dashboard
```

### 2. Counsellor Reviews High-Risk Alert

Time: ~2-3 minutes

```
Dashboard → Alerts → Select alert → 
Review details → View victim page → 
Create intervention
```

### 3. Authority Views System Status

Time: ~1-2 minutes

```
Dashboard → View metrics → 
Analytics (optional) → High-risk cases
```

---

*These flows are implemented in the current prototype and demonstrate the complete user experience.*
