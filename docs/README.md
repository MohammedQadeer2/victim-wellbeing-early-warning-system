# Documentation Index

Welcome to the Sentinel prototype documentation.

## 📚 Documentation Structure

### Getting Started
- **[Main README](../README.md)** - Project overview and quick start
- **[Frontend Guide](./FRONTEND_GUIDE.md)** - How to work with the frontend codebase

### Architecture & Design
- **[Architecture](./ARCHITECTURE.md)** - System architecture and design philosophy
- **[UI Flow](./UI_FLOW.md)** - User journeys and navigation flows
- **[Design Decisions](./DECISIONS.md)** - Key decisions and trade-offs

### Technical Guides
- **[Backend Integration](./BACKEND_INTEGRATION.md)** - How to connect a real backend
- **[Components Guide](./COMPONENTS.md)** - (See below)
- **[Mock Data Guide](./MOCK_DATA.md)** - (See below)

## Quick Reference

### For Developers

**Starting development:**
```bash
npm install
npm run dev
```

**Key directories:**
- `app/` - Pages and routes
- `components/` - Reusable components
- `types/` - TypeScript types
- `data/` - Mock data
- `services/` - API layer

### For Designers

**Design System:**
- Colors: Blue (primary), Green (low risk), Yellow (moderate), Red (high risk)
- Typography: 16px base, clear hierarchy
- Spacing: 4, 6, 8 unit system
- Components: See components/ folder

### For Product Managers

**User Roles:**
1. **Victim** - Completes check-ins, views well-being
2. **Counsellor** - Monitors cases, reviews alerts, manages interventions  
3. **Authority** - System overview, analytics, reports

**Key Features:**
- Periodic check-ins with AI analysis
- Explainable risk assessment
- Early warning alerts
- Human-led interventions
- Longitudinal tracking

## Document Summaries

### Architecture.md
Explains the system design, data flow, component hierarchy, and technology choices. Read this first to understand how everything fits together.

### Frontend Guide.md
Technical guide for developers working on the frontend. Covers file structure, patterns, styling, state management, and best practices.

### UI Flow.md
Describes user journeys for each role, navigation patterns, and critical paths through the application.

### Backend Integration.md
Step-by-step guide for connecting a Node.js backend. Includes API specifications, authentication setup, and migration checklist.

### Decisions.md
Records important design and technical decisions with reasoning. Helps understand why things are built a certain way.

## Components Reference

### Core UI Components (`components/ui/`)

**Button** - Reusable button with variants
- Variants: primary, secondary, danger, ghost
- Sizes: sm, md, lg
- Props: onClick, disabled, fullWidth

**Card** - Content container
- Props: padding, shadow, className
- Usage: Wraps dashboard content

**Badge** - Status indicators
- Types: RiskBadge, TrendBadge, StatusBadge
- Auto-colored based on value

**StatCard** - Metric display
- Shows: title, value, subtitle, trend
- Used in dashboards

**Modal** - Dialog overlay
- Auto-handles ESC key and backdrop click
- Includes ConfirmModal variant

**Alert** - Inline notifications
- Types: info, success, warning, error
- Optional close button

**Loading/Empty States** - Feedback components
- LoadingSpinner, CardSkeleton
- EmptyState with optional action

### Layout Components (`components/layout/`)

**DashboardLayout** - Main layout wrapper
- Props: userName, userRole, navItems
- Includes Navbar and Sidebar
- Mobile responsive

**Navbar** - Top navigation
- Shows logo, demo badge, user info
- Logout button

**Sidebar** - Side navigation
- Role-specific nav items
- Active state highlighting
- Mobile: toggleable drawer

**PageHeader** - Page title section
- Title, description, breadcrumbs
- Optional action button

### Dashboard Components (`components/dashboard/`)

**DistressScoreCard** - Current distress display
- Large score number
- Risk badge, trend badge
- Color-coded scale reference

**SignalCard** - Detected signals list
- Severity-colored boxes
- Signal descriptions
- Indicator lists

**AlertCard** - Alert display
- Severity border
- Explainability section
- Action buttons

### Chart Components (`components/charts/`)

**DistressTrendChart** - Line chart
- Shows distress over time
- Interactive tooltips
- Responsive sizing

**RiskDistributionChart** - Pie chart
- Risk level distribution
- Percentage labels
- Legend

## Mock Data Reference

### Data Files (`data/`)

**victims.ts**
- Sample victim records
- Dashboard data
- IDs: V-1001, V-1002, etc.

**cases.ts**
- Legal case information
- IDs: CASE-2026-001, etc.
- Case types, statuses, stages

**checkins.ts**
- Sample check-in responses
- AI analysis results
- Distress history
- Check-in questions

**alerts.ts**
- System-generated alerts
- Alert metadata
- Notifications

**dashboard.ts**
- Dashboard statistics
- Risk distribution
- System trends
- Analytics summaries

**interventions.ts**
- Intervention records
- Support services
- Intervention notes

### Type Reference (`types/`)

See TypeScript files for full definitions. Key types:

- `User` - System user
- `Victim` - Victim information
- `Case` - Legal case
- `CheckIn` - Well-being check-in
- `AIAnalysis` - AI output
- `RiskSignal` - Detected signal
- `Alert` - System alert
- `Intervention` - Support intervention
- `DashboardStats` - Dashboard data

## Common Tasks

### Adding a New Page

1. Create file in appropriate `app/` subfolder
2. Use `DashboardLayout` wrapper
3. Fetch data via service layer
4. Handle loading/error states
5. Add to navigation constants

### Adding a New Component

1. Create in appropriate `components/` subfolder
2. Define TypeScript interface for props
3. Add meaningful comments
4. Export from file
5. Document in this guide

### Updating Mock Data

1. Edit files in `data/` folder
2. Ensure data matches TypeScript types
3. Update multiple related files if needed
4. Test affected pages

### Modifying Styles

1. Use Tailwind utility classes
2. Follow existing spacing patterns
3. Ensure mobile responsive
4. Test accessibility

## Getting Help

### Code Issues
1. Check relevant documentation file
2. Look at similar existing code
3. Review TypeScript errors
4. Check browser console

### Design Questions
1. Reference Design Decisions
2. Check existing patterns in components/
3. Review Tailwind documentation

### Architecture Questions
1. Read Architecture.md
2. Check service layer implementation
3. Review type definitions

## Contributing

When adding to this project:

1. **Follow existing patterns** - Consistency matters
2. **Add comments** - Explain why, not what
3. **Update docs** - Keep documentation current
4. **Test manually** - Verify in browser
5. **Check types** - Run `npm run build`

## Acronyms & Terms

- **SIH** - Smart India Hackathon
- **AI** - Artificial Intelligence (used for analysis, not diagnosis)
- **HITL** - Human-In-The-Loop
- **UI/UX** - User Interface / User Experience
- **API** - Application Programming Interface
- **WCAG** - Web Content Accessibility Guidelines
- **Distress Score** - 0-100 indicator (not a medical diagnosis)
- **Risk Level** - LOW, MODERATE, HIGH, CRITICAL
- **Signal** - Indicator detected by AI (fear, threat, etc.)
- **Intervention** - Human-led support action

---

**Need something not covered here?**

Check the code comments - they explain implementation details not in these docs.
