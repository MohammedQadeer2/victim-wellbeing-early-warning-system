# Sentinel Backend - AI-Powered Victim Well-being Monitoring

**Phase 1-2 Foundation — MVP Backend API with Database**

This is the backend API server for the Sentinel system. It provides REST endpoints for the frontend and orchestrates:
- User authentication and role-based access
- Victim and case management
- Periodic check-ins
- AI analysis and risk assessment
- Alerts and interventions

## Prerequisites

- Node.js 18+ (https://nodejs.org/)
- npm or yarn
- PostgreSQL 14+ (https://www.postgresql.org/download/)

## Quick Start

### 1. Setup Database

Create a PostgreSQL database:
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE sentinel_db;

# Exit
\q
```

### 2. Configure Environment

Copy and update `.env`:
```bash
cp .env.example .env
```

Edit `.env` with your database URL:
```
DATABASE_URL=postgresql://username:password@localhost:5432/sentinel_db
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:3000
```

### 3. Install Dependencies

```bash
cd backend
npm install
```

### 4. Run Migrations

Create database schema:
```bash
npx prisma migrate dev --name init
```

This will:
- Create all tables
- Set up relationships
- Generate Prisma client

### 5. Seed Demo Data (Optional)

```bash
npx prisma db seed
```

### 6. Start Development Server

```bash
npm run dev
```

Server will start on `http://localhost:3001`

## Available Commands

```bash
npm run dev              # Start development server (with hot reload)
npm run build            # Compile TypeScript to JavaScript
npm start                # Run compiled JavaScript in production
npm run type-check       # Check for TypeScript errors
npx prisma studio       # View database GUI at http://localhost:5555
npx prisma migrate dev  # Create and run new migration
npx prisma db seed      # Run seed script
```

## Project Structure

```
backend/
├── src/
│   ├── index.ts              (Entry point)
│   ├── server.ts             (Express app)
│   ├── database/
│   │   └── prisma.ts         (Prisma client)
│   ├── routes/               (API routes - added in Phase 3+)
│   ├── controllers/          (Business logic - added in Phase 3+)
│   ├── services/             (Reusable services - added in Phase 3+)
│   ├── middleware/           (Auth, validation - added in Phase 3+)
│   ├── ai/                   (AI analysis - added in Phase 6)
│   ├── risk/                 (Risk engine - added in Phase 7)
│   └── types/                (TypeScript interfaces - added as needed)
├── prisma/
│   ├── schema.prisma         (Database schema)
│   └── seed.ts               (Demo data - Phase 2)
├── docs/
│   ├── DATABASE_SCHEMA.md    (Schema documentation)
│   ├── ARCHITECTURE.md       (System architecture - Phase 2)
│   └── API_FLOW.md           (API request flows - Phase 3+)
├── .env                      (Local config - don't commit)
├── .env.example              (Config template)
├── package.json              (Dependencies)
├── tsconfig.json             (TypeScript config)
└── README.md                 (This file)
```

## Phase Progress

✅ **Phase 1**: Express server, TypeScript, health endpoints
✅ **Phase 2**: PostgreSQL + Prisma database schema
⏳ **Phase 3**: Authentication and role-based access
⏳ **Phase 4**: Victim and case management APIs
⏳ **Phase 5**: Check-in system
⏳ **Phase 6**: AI analysis service
⏳ **Phase 7**: Risk engine
⏳ **Phase 8**: Check-in → AI → Risk pipeline
⏳ **Phase 9**: Alert system
⏳ **Phase 10**: Intervention system
⏳ **Phase 11**: Dashboard APIs
⏳ **Phase 12**: Frontend integration

## How It Works

### Request/Response Flow

```
Frontend (Next.js)
      ↓
  HTTP Request
      ↓
Backend Express Server (Port 3001)
      ↓
  Middleware (parse JSON, CORS, auth)
      ↓
  Route Handler
      ↓
  Prisma Query
      ↓
  PostgreSQL Database
      ↓
  Response (JSON)
      ↓
Frontend renders data
```

### Data Storage

All data is stored in PostgreSQL:
- Users (authentication)
- Victims (case subjects)
- Cases (legal cases)
- CheckIns (periodic assessments)
- AIAnalysis (signal extraction)
- RiskAssessments (distress scores)
- Alerts (high-risk flags)
- Interventions (support actions)

## Database Schema

See [docs/DATABASE_SCHEMA.md](docs/DATABASE_SCHEMA.md) for complete schema documentation.

**Key Concept: Longitudinal Data**

The entire system tracks changes over time:
```
June: CheckIn 1 → Distress Score 42
July: CheckIn 2 → Distress Score 57
August: CheckIn 3 → Distress Score 71
September: CheckIn 4 → Distress Score 84

Trend: INCREASING DISTRESS
Alert: HIGH RISK
Action: Counsellor reviews and provides support
```

## Troubleshooting

### "Cannot connect to database"
- Check DATABASE_URL in .env
- Verify PostgreSQL is running
- Create database if missing

### "Table does not exist"
- Run migrations: `npx prisma migrate dev --name init`
- Check migration status: `npx prisma migrate status`

### "Port 3001 already in use"
- Change PORT in .env
- Or kill existing process: `pkill -f "node.*3001"`

### TypeScript errors
- Run: `npm run type-check`
- Install missing types: `npm install --save-dev @types/packagename`

## Security Notes

- Passwords are NEVER stored as plain text (hashed with bcrypt in Phase 3)
- Environment variables in `.env` should never be committed
- Use strong DATABASE_URL with secure password
- JWT tokens will be used for authentication (Phase 3)
- CORS is configured to allow only frontend origin
- Role-based access control prevents unauthorized data access

## Development Notes

- TypeScript strict mode is enabled (catches errors early)
- CORS allows frontend at http://localhost:3000
- Database timestamps are in ISO 8601 format
- All responses follow consistent JSON structure
- Logging includes SQL queries in development
- Graceful shutdown on SIGTERM/SIGINT

## Next Steps

After Phase 2 is verified working:
- Phase 3: Authentication, password hashing, JWT tokens, role middleware
- Phase 4: Victim and case management endpoints
- Phase 5: Check-in submission endpoints
