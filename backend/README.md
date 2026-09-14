# Sentinel Backend - AI-Powered Victim Well-being Monitoring

**Phase 1 Foundation — MVP Backend API**

This is the backend API server for the Sentinel system. It provides REST endpoints for the frontend and orchestrates:
- User authentication and role-based access
- Victim and case management
- Periodic check-ins
- AI analysis and risk assessment
- Alerts and interventions

## Quick Start

### Prerequisites
- Node.js 18+ (https://nodejs.org/)
- npm or yarn

### Installation

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Start development server
npm run dev
```

Server will start on `http://localhost:3001`

### Test Health Endpoint

Open in browser or curl:
```bash
curl http://localhost:3001/health
```

Expected response:
```json
{
  "status": "ok",
  "message": "Sentinel backend is running",
  "timestamp": "2026-09-15T12:00:00.000Z",
  "environment": "development"
}
```

## Available Commands

```bash
npm run dev         # Start development server (with hot reload)
npm run build       # Compile TypeScript to JavaScript
npm start           # Run compiled JavaScript in production
npm run type-check  # Check for TypeScript errors without building
```

## Project Structure

```
backend/
├── src/
│   ├── index.ts       (Entry point - starts the server)
│   ├── server.ts      (Express app configuration)
│   ├── routes/        (API routes - will be added)
│   ├── controllers/   (Business logic - will be added)
│   ├── services/      (Reusable services - will be added)
│   ├── middleware/    (Auth, validation - will be added)
│   ├── ai/            (AI analysis - will be added)
│   ├── risk/          (Risk engine - will be added)
│   ├── database/      (Database connections - will be added)
│   └── types/         (TypeScript interfaces - will be added)
├── .env              (Environment variables - LOCAL, don't commit)
├── .env.example      (Template for .env)
├── package.json      (Dependencies)
├── tsconfig.json     (TypeScript configuration)
└── README.md         (This file)
```

## Phase 1 - Foundation

✅ Completed:
- Express server
- TypeScript configuration
- Basic `/health` endpoint
- Environment setup
- CORS configuration

Next: Database + Prisma (Phase 2)

## How It Works

### Request/Response Flow

```
Frontend (Next.js)
      ↓
  HTTP Request
      ↓
Backend Express Server
      ↓
  Middleware (parse JSON, CORS)
      ↓
  Route Handler
      ↓
  Response (JSON)
      ↓
Frontend renders data
```

### Example: GET /health

```
1. Frontend sends: GET http://localhost:3001/health
2. Express receives request
3. Routes to: app.get('/health', ...)
4. Handler creates response object
5. Sends back: { status: 'ok', ... }
6. Frontend receives JSON and displays
```

## Development Notes

- TypeScript strict mode is enabled (catches errors early)
- CORS is configured to allow frontend access
- Environment variables in `.env` (never committed to git)
- All timestamps are in ISO 8601 format
- Responses follow consistent JSON structure

## Next Steps

After Phase 1 is verified working:
- Phase 2: PostgreSQL + Prisma database setup
- Phase 3: Authentication and role-based access
- Phase 4: Victim and case management endpoints
