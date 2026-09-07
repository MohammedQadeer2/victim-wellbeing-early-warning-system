# Frontend Implementation Guide

## Project Setup

### Directory Structure

```
sentinel_prototype/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Landing page
│   ├── login/             # Authentication
│   ├── victim/            # Victim role pages
│   ├── counsellor/        # Counsellor role pages
│   ├── authority/         # Authority role pages
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
│
├── components/
│   ├── ui/                # Base UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Modal.tsx
│   │   ├── Alert.tsx
│   │   ├── StatCard.tsx
│   │   ├── LoadingState.tsx
│   │   └── EmptyState.tsx
│   │
│   ├── layout/            # Layout components
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   ├── PageHeader.tsx
│   │   └── DashboardLayout.tsx
│   │
│   ├── charts/            # Visualization components
│   │   ├── DistressTrendChart.tsx
│   │   └── RiskDistributionChart.tsx
│   │
│   └── dashboard/         # Dashboard-specific
│       ├── DistressScoreCard.tsx
│       ├── SignalCard.tsx
│       └── AlertCard.tsx
│
├── types/                 # TypeScript definitions
│   ├── user.ts
│   ├── victim.ts
│   ├── case.ts
│   ├── checkin.ts
│   ├── risk.ts
│   ├── alert.ts
│   ├── intervention.ts
│   ├── dashboard.ts
│   └── index.ts
│
├── data/                  # Mock data
│   ├── victims.ts
│   ├── cases.ts
│   ├── checkins.ts
│   ├── alerts.ts
│   ├── dashboard.ts
│   ├── interventions.ts
│   └── index.ts
│
├── services/              # API service layer
│   └── api.ts
│
├── utils/                 # Utility functions
│   └── formatting.ts
│
└── constants/             # Constants & config
    └── index.ts
```

## Key Patterns

### 1. Page Structure

All pages follow this pattern:

```typescript
'use client';  // Client component for interactivity

import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageHeader } from '@/components/layout/PageHeader';
// ... other imports

export default function PageName() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DataType | null>(null);
  
  useEffect(() => {
    async function loadData() {
      try {
        const result = await getDataFromAPI();
        setData(result);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);
  
  if (loading) return <LoadingSpinner />;
  if (!data) return <ErrorMessage />;
  
  return (
    <DashboardLayout {...props}>
      <PageHeader {...headerProps} />
      {/* Page content */}
    </DashboardLayout>
  );
}
```

### 2. Component Patterns

**Reusable Components:**

```typescript
// components/ui/Button.tsx
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
}

export function Button({ children, ...props }: ButtonProps) {
  // Implementation
}
```

**Dashboard Layout:**

```typescript
<DashboardLayout
  userName="User Name"
  userRole="Role"
  navItems={NAV_ITEMS}
>
  {children}
</DashboardLayout>
```

### 3. Data Fetching Pattern

All API calls go through the service layer:

```typescript
// services/api.ts
export async function getVictimDashboard(id: string) {
  await delay(500); // Simulate network
  return mockData;  // Will be replaced with real API call
}

// In component
const data = await getVictimDashboard(victimId);
```

### 4. Type Safety

Always use TypeScript types:

```typescript
import { Victim, Case, CheckIn } from '@/types';

interface Props {
  victim: Victim;
  case: Case;
  checkIns: CheckIn[];
}
```

## Styling Guidelines

### Tailwind CSS Usage

**Spacing:**
- Use consistent spacing: `gap-4`, `gap-6`, `gap-8`
- Padding: `p-4`, `p-6`, `p-8`
- Margin: `mb-4`, `mb-6`, `mb-8`

**Responsive Design:**
```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* Content */}
</div>
```

**Colors:**
- Blue: Primary actions, distress scores
- Green: Low risk, success states
- Yellow: Moderate risk, warnings
- Red: High risk, critical states
- Gray: Text, borders, backgrounds

**Typography:**
- Headings: `text-xl`, `text-2xl`, `text-3xl`
- Body: `text-base` (16px)
- Small: `text-sm`
- Font weights: `font-medium`, `font-semibold`, `font-bold`

### Accessibility

**Required Attributes:**
```typescript
<button
  aria-label="Close modal"
  onClick={onClose}
>
  ×
</button>

<input
  id="email"
  type="email"
  aria-describedby="email-help"
/>
```

**Focus States:**
All interactive elements have visible focus states via Tailwind's `focus:` utilities.

**Color Contrast:**
Ensure WCAG AA compliance (4.5:1 for normal text).

## State Management

### Local State

Use `useState` for component-local state:

```typescript
const [isOpen, setIsOpen] = useState(false);
const [formData, setFormData] = useState<FormData>({});
```

### Side Effects

Use `useEffect` for data fetching and subscriptions:

```typescript
useEffect(() => {
  async function fetchData() {
    const result = await api.getData();
    setData(result);
  }
  fetchData();
}, [dependencies]);
```

### Form Handling

```typescript
const [formValues, setFormValues] = useState({});

const handleChange = (field: string, value: any) => {
  setFormValues(prev => ({ ...prev, [field]: value }));
};

const handleSubmit = async () => {
  await api.submit(formValues);
};
```

## Navigation

### Role-Based Navigation

Each role has its own navigation items:

```typescript
// constants/index.ts
export const VICTIM_NAV_ITEMS = [
  { label: 'Dashboard', href: '/victim' },
  { label: 'Check-in', href: '/victim/check-in' },
  // ...
];
```

### Link Components

Use Next.js Link for navigation:

```typescript
import Link from 'next/link';

<Link href="/victim/check-in">
  <Button>Start Check-in</Button>
</Link>
```

## Error Handling

### Loading States

```typescript
if (loading) {
  return <LoadingSpinner size="lg" />;
}
```

### Error States

```typescript
if (error) {
  return (
    <Alert type="error" title="Error" message={error.message} />
  );
}
```

### Empty States

```typescript
if (data.length === 0) {
  return (
    <EmptyState
      title="No data found"
      description="Description here"
    />
  );
}
```

## Performance Optimization

### Code Splitting

Next.js automatically code-splits by route.

### Image Optimization

Use Next.js Image component:

```typescript
import Image from 'next/image';

<Image
  src="/image.png"
  alt="Description"
  width={500}
  height={300}
/>
```

### Memoization

Use React.memo for expensive components:

```typescript
export const ExpensiveComponent = React.memo(({ data }) => {
  // Component logic
});
```

## Testing Strategy

### Type Checking

```bash
npm run build  # Checks TypeScript types
```

### Linting

```bash
npm run lint  # ESLint checks
```

### Manual Testing Checklist

- [ ] All routes load without errors
- [ ] Navigation works correctly
- [ ] Forms validate and submit
- [ ] Charts render with data
- [ ] Responsive design works on mobile
- [ ] Keyboard navigation works
- [ ] Focus states are visible
- [ ] Loading states display correctly
- [ ] Error states display correctly

## Common Issues & Solutions

### Issue: Type errors with mock data

**Solution:** Ensure mock data matches TypeScript interfaces exactly.

### Issue: Charts not rendering

**Solution:** Check that data format matches Recharts requirements.

### Issue: Styles not applying

**Solution:** 
1. Check Tailwind class names are correct
2. Ensure globals.css is imported in layout.tsx
3. Run `npm run dev` to rebuild

### Issue: Navigation not working

**Solution:** Use Next.js Link component, not regular `<a>` tags.

## Best Practices

1. **Keep components small**: < 200 lines ideally
2. **Use TypeScript**: Always type your props and state
3. **Comment your code**: Explain why, not what
4. **Consistent naming**: camelCase for functions, PascalCase for components
5. **Extract constants**: Don't hardcode values
6. **Handle errors**: Always have error states
7. **Loading feedback**: Show loading states for async operations
8. **Accessibility**: Test with keyboard only
9. **Responsive first**: Design mobile, enhance for desktop
10. **Keep it simple**: Avoid premature optimization

## File Naming Conventions

- **Components**: PascalCase.tsx (`Button.tsx`)
- **Pages**: lowercase.tsx or page.tsx
- **Utilities**: camelCase.ts (`formatting.ts`)
- **Types**: lowercase.ts (`user.ts`)
- **Constants**: UPPERCASE or index.ts

## Code Style

- Use functional components
- Use arrow functions for component logic
- Destructure props
- Use template literals for strings with variables
- Use optional chaining (`?.`) for potentially undefined values
- Use nullish coalescing (`??`) for default values

---

*Follow these guidelines to maintain consistency across the codebase.*
