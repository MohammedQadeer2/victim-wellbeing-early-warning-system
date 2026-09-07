# Sentinel - AI-Powered Victim Well-being Monitoring System

**SIH 2026 Prototype**

A continuous, explainable early-warning support system for victims of atrocities throughout the case lifecycle.

## 🎯 Overview

Sentinel is a **frontend prototype** that demonstrates an AI-powered system for monitoring victim well-being through periodic check-ins, AI analysis, and human-led interventions. This prototype showcases the complete user experience for three key roles:

- **Victims**: Complete check-ins, track well-being, access support
- **Counsellors**: Monitor cases, review AI alerts, manage interventions
- **Authorities**: System overview, analytics, and reporting

## ⚠️ Important Notes

- **This is a FRONTEND PROTOTYPE ONLY**
- Uses mock/demo data (no real victim information)
- No backend, database, or real AI model connected
- Authentication is simulated for demonstration
- All data shown is synthetic and for prototype purposes only

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Demo Access

On the login page, select your role:
- **Victim Demo**: View victim dashboard and complete check-ins
- **Counsellor Demo**: Monitor cases and review alerts
- **Authority Demo**: System overview and analytics

## 🏗️ Project Structure

```
sentinel_prototype/
├── app/                      # Next.js App Router pages
│   ├── page.tsx             # Landing page
│   ├── login/               # Login/role selection
│   ├── victim/              # Victim dashboard & screens
│   ├── counsellor/          # Counsellor dashboard & screens
│   └── authority/           # Authority dashboard & screens
├── components/              # React components
│   ├── ui/                  # Base UI components
│   ├── layout/              # Layout components
│   ├── charts/              # Chart components
│   └── dashboard/           # Dashboard-specific components
├── types/                   # TypeScript type definitions
├── data/                    # Mock data
├── services/                # API service layer (mock)
├── utils/                   # Utility functions
├── constants/               # Constants and configuration
└── docs/                    # Documentation
```

## 📚 Key Features

### 1. Dynamic Distress Tracking
- Periodic check-ins capture victim well-being
- AI analyzes responses to calculate distress scores
- Longitudinal trend tracking over time

### 2. Explainable AI Analysis
- Clear explanations for why alerts are generated
- Detected signals with severity levels
- Risk factor breakdowns with evidence

### 3. Early Warning System
- Automatic alert generation for high-risk cases
- Escalation risk prediction
- Trend-based risk assessment

### 4. Human-in-the-Loop
- AI assists, humans decide
- All interventions require human review
- Clear separation between AI insights and human actions

### 5. Role-Based Access
- Three distinct user roles with appropriate dashboards
- Role-specific navigation and information display
- Privacy-conscious information access

## 🎨 Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React

## 📖 Documentation

Comprehensive documentation is available in the `/docs` folder:

- [Architecture Guide](./docs/ARCHITECTURE.md) - System architecture and design decisions
- [Frontend Guide](./docs/FRONTEND_GUIDE.md) - Frontend implementation details
- [UI Flow](./docs/UI_FLOW.md) - User journeys and navigation
- [Components Guide](./docs/COMPONENTS.md) - Component documentation
- [Mock Data Guide](./docs/MOCK_DATA.md) - Mock data structure
- [Backend Integration](./docs/BACKEND_INTEGRATION.md) - How to connect backend
- [Design Decisions](./docs/DECISIONS.md) - Key design decisions

## 🔒 Privacy & Ethics

This prototype demonstrates responsible AI principles:

- **No Real Data**: All data is synthetic
- **Human Oversight**: AI assists, humans decide
- **Not a Diagnosis**: Distress scores are indicators, not medical diagnoses
- **Transparency**: Clear explanations for all AI outputs
- **Privacy First**: Designed with data privacy in mind

## 🚧 What's NOT Included (Intentionally)

This is a frontend-only prototype. The following are NOT implemented:

- ❌ Backend API server
- ❌ Database
- ❌ Real AI/ML model
- ❌ Real authentication/authorization
- ❌ Voice/IVRS integration
- ❌ SMS/WhatsApp integration
- ❌ Government API integration
- ❌ Production infrastructure

These will be built separately after frontend validation.

## 🧪 Testing

```bash
# Run TypeScript type checking
npm run build

# Run linting
npm run lint
```

## 📝 Development Guidelines

1. **Keep It Simple**: Avoid over-engineering
2. **Document Everything**: Code comments and markdown docs
3. **Mock Data First**: Build UI before connecting backend
4. **Readable Code**: Clear names, small functions
5. **Accessibility**: Follow WCAG guidelines

## 🤝 Contributing

This is a prototype for SIH 2026. For the actual development phase:

1. Review documentation in `/docs`
2. Follow the established patterns
3. Keep mock data separate from real data paths
4. Maintain the human-in-the-loop philosophy

## 📄 License

This is a prototype developed for Smart India Hackathon 2026.

## 🙋 Support

For questions about this prototype:
- Review the documentation in `/docs`
- Check the code comments throughout the application
- Refer to the design decisions document

---

**Built for SIH 2026** | **Prototype Demo** | **Frontend Only**
