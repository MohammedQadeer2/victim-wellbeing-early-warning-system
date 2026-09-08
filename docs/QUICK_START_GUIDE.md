# 🚀 Quick Start Guide

> **Get up and running in 5 minutes!** This guide walks you through setting up and exploring the project.

---

## ✅ Prerequisites

Before you start, make sure you have:
- ✅ Node.js installed (version 18 or higher)
- ✅ A code editor (VS Code recommended)
- ✅ Basic understanding of web development
- ✅ Terminal/Command Prompt access

---

## 📥 Installation

### Step 1: Navigate to Project
```bash
cd sentinel_prototype
```

### Step 2: Install Dependencies
```bash
npm install
```
*This downloads all required packages (~2-3 minutes)*

### Step 3: Start Development Server
```bash
npm run dev
```
*Server starts on http://localhost:3000*

### Step 4: Open in Browser
Visit: `http://localhost:3000`

---

## 🎮 Exploring the System

### Landing Page (http://localhost:3000)

You'll see:
- Hero section explaining the system
- Three role options
- "Try Demo" button

**What to do:**
1. Read the description
2. Click "Try Demo" → Goes to login page

---

### Login Page (http://localhost:3000/login)

Three demo login options:

#### Option 1: Login as Victim
```
Click "Login as Victim Demo"
→ Goes to /victim dashboard
```

**What you'll see:**
- Current distress score: 65
- Trend chart showing mood over time
- Quick action buttons
- Recent check-ins

**What to try:**
1. Click "Start Check-in" button
2. Answer 8 questions about well-being
3. Submit and view AI-generated results
4. Explore "AI Assistant" page
5. Check "Well-being" trends page

---

#### Option 2: Login as Counsellor
```
Click "Login as Counsellor Demo"
→ Goes to /counsellor dashboard
```

**What you'll see:**
- Assigned cases: 12
- High-risk alerts: 3
- Cases requiring attention (table)
- System metrics

**What to try:**
1. Click on a case in the table
2. View detailed victim profile
3. Read AI explainability section ("Why was this flagged?")
4. Check the "Alerts" page
5. View "Interventions" page

---

#### Option 3: Login as Authority
```
Click "Login as Authority Demo"
→ Goes to /authority dashboard
```

**What you'll see:**
- Total cases overview
- Risk distribution pie chart
- System-wide statistics
- District breakdown

**What to try:**
1. View "High-Risk Cases" page
2. Check "Analytics" for detailed stats
3. Try "Reports" generation feature

---

## 📖 Understanding the Code

### Recommended Learning Path

#### Week 1: Start Small
1. Open `app/page.tsx` (Landing page)
   - Simple component
   - Understand structure
   - See how Next.js pages work

2. Open `components/ui/Button.tsx`
   - See reusable component
   - Understand props
   - See TypeScript types

3. Open `types/victim.ts`
   - Understand TypeScript interfaces
   - See how data is structured

---

#### Week 2: Data Flow
1. Open `services/api.ts`
   - See all API functions
   - Understand how data is fetched
   - Notice mock data returns

2. Open `data/victims.ts`
   - See mock data structure
   - Understand how it matches types

3. Open `app/victim/page.tsx`
   - See how page uses API
   - Understand useState & useEffect
   - Follow data from API to UI

---

#### Week 3: Complex Features
1. Open `app/victim/check-in/page.tsx`
   - Multi-step form
   - State management
   - Navigation between steps

2. Open `components/charts/DistressTrendChart.tsx`
   - Data visualization
   - Recharts library usage
   - Props and customization

3. Open `app/counsellor/victims/[id]/page.tsx`
   - Dynamic routing
   - Complex data display
   - Multiple components

---

## 🛠️ Common Tasks

### Adding a New Page

1. Create file in `app/` directory:
```tsx
// app/test/page.tsx
export default function TestPage() {
  return <h1>My Test Page</h1>;
}
```

2. Visit `http://localhost:3000/test`

### Creating a New Component

1. Create file in `components/`:
```tsx
// components/MyComponent.tsx
interface MyComponentProps {
  title: string;
}

export function MyComponent({ title }: MyComponentProps) {
  return <div>{title}</div>;
}
```

2. Use it in a page:
```tsx
import { MyComponent } from '@/components/MyComponent';

<MyComponent title="Hello!" />
```

### Adding Mock Data

1. Open appropriate file in `data/`:
```tsx
// data/victims.ts
export const mockVictims: Victim[] = [
  {
    id: "V-1005",
    name: "New User",
    // ... other fields
  }
];
```

2. Data automatically available via API service

---

## 🔍 Testing Features

### Test the Check-in Flow

1. Go to `/victim`
2. Click "Start Check-in"
3. Answer questions
4. **Watch the console** (F12 → Console tab)
   - See data being saved
   - Watch state updates
5. Submit and view results

### Test the Alert System

1. Go to `/counsellor`
2. Look at "High-Risk Alerts" section
3. Click an alert
4. **Notice the "Why flagged?" section**
   - This is AI explainability
   - Shows reasoning behind alert

### Test Responsive Design

1. Open any page
2. Press F12 to open DevTools
3. Click "Toggle Device Toolbar" (Ctrl+Shift+M)
4. Try different screen sizes:
   - iPhone: 375px width
   - iPad: 768px width
   - Desktop: 1920px width
5. **Watch the layout change**

---

## 🐛 Troubleshooting

### Port Already in Use

**Error:** `Port 3000 is already in use`

**Solution:**
```bash
# Kill the process on port 3000
npx kill-port 3000

# Or use different port
npm run dev -- -p 3001
```

### Module Not Found

**Error:** `Cannot find module '...'`

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### TypeScript Errors

**Error:** Red squiggly lines in code

**Solution:**
1. Check you're using correct types
2. Import missing types
3. Restart VS Code TypeScript server:
   - Press Ctrl+Shift+P
   - Type "Restart TS Server"
   - Press Enter

### Build Errors

**Error:** Build fails with errors

**Solution:**
```bash
# Run build to see specific errors
npm run build

# Check error messages carefully
# Fix issues one by one
# Common issues:
# - Unescaped characters (' → &apos;)
# - TypeScript type errors
# - Missing imports
```

---

## 📝 Development Workflow

### Daily Development Cycle

```bash
1. Start server
   npm run dev

2. Make changes
   - Edit files
   - Save automatically refreshes

3. Test in browser
   - Check functionality
   - Use React DevTools

4. Check for errors
   - Console (F12)
   - Terminal output

5. Build test (before committing)
   npm run build

6. Commit changes
   git add .
   git commit -m "Description"
```

---

## 🎯 Learning Resources

### Recommended Reading Order

1. **Start Here:**
   - `docs/BEGINNER_GUIDE.md` (This was just created!)
   - `docs/VISUAL_FLOWCHARTS.md` (Visual diagrams)

2. **Then Read:**
   - `docs/ARCHITECTURE.md` (System design)
   - `docs/UI_FLOW.md` (User journeys)

3. **For Coding:**
   - `docs/FRONTEND_GUIDE.md` (Implementation details)

4. **For Backend:**
   - `docs/BACKEND_INTEGRATION.md` (API specs)

### External Resources

**Next.js:**
- [Official Tutorial](https://nextjs.org/learn)
- [App Router Docs](https://nextjs.org/docs/app)

**React:**
- [React Docs (New)](https://react.dev/)
- [React Hooks](https://react.dev/reference/react)

**TypeScript:**
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript in 5 Minutes](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)

**Tailwind CSS:**
- [Official Docs](https://tailwindcss.com/docs)
- [Cheat Sheet](https://nerdcave.com/tailwind-cheat-sheet)

---

## 💡 Pro Tips

### VS Code Extensions

Install these for better experience:
- **ES7+ React/Redux/React-Native snippets** - Code snippets
- **Tailwind CSS IntelliSense** - CSS class suggestions
- **TypeScript Error Translator** - Better error messages
- **Auto Rename Tag** - Update matching HTML tags
- **Prettier** - Code formatter

### Browser DevTools

**F12 to open, then:**
- **Elements tab** - Inspect HTML/CSS
- **Console tab** - See logs and errors
- **Network tab** - See API calls
- **React DevTools** - Inspect React components
- **Lighthouse** - Performance analysis

### Keyboard Shortcuts

**VS Code:**
- `Ctrl+P` - Quick file open
- `Ctrl+Shift+P` - Command palette
- `Ctrl+` ` - Toggle terminal
- `Alt+Up/Down` - Move line
- `Ctrl+D` - Select next occurrence

**Browser:**
- `Ctrl+Shift+C` - Inspect element
- `Ctrl+Shift+R` - Hard refresh
- `Ctrl+Shift+M` - Toggle device toolbar
- `F12` - Open DevTools

---

## 🎉 Next Steps

### After Understanding the Basics

1. **Modify Existing Features**
   - Change colors/styles
   - Add new questions to check-in
   - Modify dashboard cards

2. **Add Small Features**
   - New stat card
   - Additional chart
   - Custom badge colors

3. **Build Something New**
   - Profile edit page
   - Settings page
   - Notification system

4. **Connect Real Backend**
   - Build API server
   - Replace mock data
   - Add authentication

---

## 📞 Getting Help

### When Stuck

1. **Check documentation** in `docs/` folder
2. **Read code comments** - They explain complex parts
3. **Use browser console** - See actual errors
4. **Check TypeScript errors** - They tell you what's wrong
5. **Google the error** - Someone likely had same issue

### Good Questions to Ask

❌ Bad: "It doesn't work"
✅ Good: "When I click Submit on check-in form, I get error: 'Cannot read property...' in line 45 of page.tsx"

❌ Bad: "How do I add a button?"
✅ Good: "I want to add a button in the victim dashboard that opens the support page. Where should I add the code?"

---

**You're all set! Start exploring and happy coding! 🚀**
