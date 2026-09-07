# Design Decisions

This document records key architectural and design decisions made during the prototype development.

## Technology Decisions

### Why Next.js over Create React App?

**Decision**: Use Next.js with App Router

**Reasons**:
- Built-in routing (no need for React Router)
- Better performance with automatic code splitting
- TypeScript support out of the box
- Easy deployment options
- Server and client components flexibility
- Growing ecosystem and community

**Trade-offs**:
- Slightly steeper learning curve
- More opinionated structure

### Why TypeScript over JavaScript?

**Decision**: Use TypeScript throughout

**Reasons**:
- Catch errors at compile time, not runtime
- Better IDE autocomplete and intellisense
- Self-documenting code through types
- Easier refactoring
- Industry standard for modern React apps

**Trade-offs**:
- More initial setup
- Learning curve for beginners
- Slightly more verbose

### Why Tailwind CSS over Component Libraries?

**Decision**: Use Tailwind CSS instead of Material-UI, Chakra, etc.

**Reasons**:
- Full design control without fighting library defaults
- Smaller bundle size (only includes used classes)
- Consistent design system via configuration
- No runtime style computation
- Easy to customize
- Modern utility-first approach

**Trade-offs**:
- More HTML/JSX code
- Need to build own components
- Not as fast for prototyping (but we built reusable components)

### Why Recharts?

**Decision**: Use Recharts for data visualization

**Reasons**:
- React-native (not a wrapper around D3)
- Good documentation
- Reasonable bundle size
- Sufficient features for our needs
- Active maintenance

**Trade-offs**:
- Not as feature-rich as D3
- Limited customization compared to building custom with D3

## Architectural Decisions

### Frontend-Only Prototype

**Decision**: Build complete frontend before backend

**Reasons**:
- Validate UX before investing in backend
- Allow parallel backend development later
- Easier to demo and iterate on UI
- Clear separation of concerns
- Stakeholder feedback on actual UI, not mockups

**Trade-offs**:
- Mock data needs to be maintained
- Some features are simulated
- Extra work to integrate backend later (but service layer makes this easier)

### Service Layer Abstraction

**Decision**: All API calls go through `services/api.ts`

**Reasons**:
- Single place to switch from mock to real data
- Consistent API interface
- Easy to add caching, retries, etc.
- Testable independently
- Clear boundary between UI and data

**Trade-offs**:
- Extra abstraction layer
- More files to maintain

### Mock Data Structure

**Decision**: Separate mock data files in `/data` folder

**Reasons**:
- Easy to find and update mock data
- Reusable across components
- Can be replaced entirely when backend ready
- Clear what's mock vs real

**Trade-offs**:
- Mock data needs to stay in sync with types
- Duplication if same data needed in multiple places

### Role-Based Route Structure

**Decision**: Separate routes for each role (`/victim/*`, `/counsellor/*`, `/authority/*`)

**Reasons**:
- Clear separation of concerns
- Easy to apply role-specific access control
- Prevents information leakage
- Clean URL structure
- Matches mental model of users

**Trade-offs**:
- Some code duplication (but shared components mitigate this)
- More route files

## UI/UX Decisions

### Three Separate Dashboards

**Decision**: Don't combine roles into one dashboard

**Reasons**:
- Each role has different needs and information requirements
- Security: victims shouldn't see counsellor tools
- Cognitive load: simpler interfaces for each role
- Better mobile experience
- Clearer purpose for each user

**Trade-offs**:
- More pages to build and maintain
- Some shared functionality duplicated

### Explainability Section in Counsellor View

**Decision**: Dedicated "Why was this flagged?" section with clear explanations

**Reasons**:
- Critical for trust in AI system
- Required for human-in-the-loop decision making
- Helps counsellors understand context
- Reduces blind reliance on AI
- Shows factors AI considered

**Trade-offs**:
- Takes up screen space
- Requires backend to provide explanations

### Step-by-Step Check-in

**Decision**: One question per screen, not all questions on one page

**Reasons**:
- Less overwhelming for victims
- Better mobile experience
- Progress indicator provides feedback
- Higher completion rate (less abandonment)
- Focuses attention on each question

**Trade-offs**:
- More clicks required
- Longer perceived time

### Simple, Calm Design

**Decision**: Clean, spacious design with calm colors

**Reasons**:
- This is for victims of trauma - avoid aggressive design
- Professional and trustworthy appearance
- Reduces cognitive load
- Accessibility for all users
- Appropriate for serious use case

**Trade-offs**:
- Less "exciting" than trendy designs
- May seem "boring" compared to consumer apps

### Large, Readable Text

**Decision**: Base font size 16px (text-base), not smaller

**Reasons**:
- Accessibility requirement
- Easier to read on all devices
- Reduces eye strain
- Many users may be older or have vision challenges
- Professional standard

**Trade-offs**:
- Less information fits on screen
- More scrolling required

## Data & State Decisions

### Component-Level State Only

**Decision**: No global state management (Redux, Zustand, etc.)

**Reasons**:
- Simpler architecture for prototype
- Each page fetches its own data
- Reduces complexity
- Easier to understand for beginners
- Can add later if needed

**Trade-offs**:
- Some data refetched unnecessarily
- No shared state between unrelated components
- May need to add if app grows complex

### Mock Data Delay

**Decision**: Add artificial 500ms delay to mock API calls

**Reasons**:
- Simulates real network conditions
- Tests loading states
- More realistic demo
- Prevents race conditions being hidden

**Trade-offs**:
- Slightly slower development
- Not configurable (could add env variable)

## Security Decisions

### No Real Authentication in Prototype

**Decision**: Demo login without password

**Reasons**:
- This is a UI prototype only
- Real auth requires backend
- Allows easy switching between roles
- Clear it's a demo

**Trade-offs**:
- Must be replaced before production
- Could give wrong impression if not labeled clearly

### No Sensitive Data

**Decision**: All victim data is anonymized/synthetic

**Reasons**:
- Legal and ethical requirement
- Prototype only
- Protects real victim privacy
- Allows public demo

**Trade-offs**:
- Data may not reflect real-world complexity

## Testing Decisions

### Manual Testing Only

**Decision**: No automated tests in prototype

**Reasons**:
- Prototype phase - UI changing rapidly
- Test pyramid: manual > integration > unit for UI prototypes
- Focus effort on building features
- Can add tests in production phase

**Trade-offs**:
- No regression testing
- Manual testing takes time
- Bugs may slip through

## Performance Decisions

### No Advanced Optimizations

**Decision**: Standard Next.js optimizations only

**Reasons**:
- Prototype doesn't need premature optimization
- Next.js already does good job by default
- Focus on functionality first
- Can profile and optimize later if needed

**Trade-offs**:
- May have performance issues with large datasets
- Some re-renders could be prevented

## Responsive Design Decisions

### Desktop-First Design

**Decision**: Optimize for desktop, ensure mobile works

**Reasons**:
- SIH demo likely on desktop/laptop
- Counsellor and authority users primarily desktop
- Mobile still functional, just not primary target

**Trade-offs**:
- Mobile experience not optimal
- Some advanced mobile patterns not used

## Future Decisions to Make

These decisions are deferred for production phase:

1. **State Management**: Add Zustand or Context if needed
2. **Testing**: Set up Jest, React Testing Library, Playwright
3. **Error Tracking**: Add Sentry or similar
4. **Analytics**: Add Google Analytics or Mixpanel
5. **Performance**: Profile and optimize bottlenecks
6. **Accessibility**: Full WCAG audit and fixes
7. **Internationalization**: Add i18n for multiple languages
8. **Offline Support**: Add service worker for offline use
9. **Real-time**: Add WebSocket for live updates
10. **Advanced Features**: Voice input, mobile app, etc.

## Lessons Learned

### What Worked Well

1. **Service layer abstraction** - Made mock data easy to manage
2. **TypeScript** - Caught many errors early
3. **Component reusability** - Saved lots of time
4. **Clear folder structure** - Easy to navigate
5. **Documentation** - Helps team understand decisions

### What Could Be Improved

1. **More shared components** - Some duplication exists
2. **Better error handling** - Could be more robust
3. **Loading states** - Could be more sophisticated
4. **Accessibility** - Could do full audit
5. **Testing** - Should add at least integration tests

### What We'd Do Differently

1. **Start with design system** - Define all components upfront
2. **Add Storybook** - For component development
3. **Set up testing early** - Even for prototypes
4. **More user testing** - Get feedback earlier
5. **Performance budget** - Set limits upfront

---

*This document should be updated as more decisions are made during production development.*
