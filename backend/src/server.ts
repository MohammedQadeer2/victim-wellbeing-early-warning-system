// Backend server for Sentinel
// This is the main Express application that handles all API requests

import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Routes
import authRoutes from './routes/auth.routes';

// Load environment variables from .env file
dotenv.config();

// Create Express application
const app: Express = express();

// ============================================================================
// MIDDLEWARE
// ============================================================================
// Middleware runs on EVERY request before it reaches the route handlers

// Parse incoming JSON request bodies
// Without this, req.body would be undefined
app.use(express.json());

// Allow frontend to call this API
// CORS = Cross-Origin Resource Sharing
// Without this, the frontend (localhost:3000) cannot call the backend (localhost:3001)
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  })
);

// ============================================================================
// HEALTH CHECK ENDPOINT
// ============================================================================
// This is a simple test endpoint to verify the server is running

// Route: GET /health
// Purpose: Simple health check - verify the server is alive and responding
// Returns: JSON object with status
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    message: 'Sentinel backend is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// ============================================================================
// API VERSION ENDPOINT
// ============================================================================
// Useful for the frontend to know which backend version it's talking to

app.get('/api/version', (req: Request, res: Response) => {
  res.status(200).json({
    version: '0.1.0',
    name: 'Sentinel Backend - MVP',
    phase: 3,
    status: 'authentication',
  });
});

// ============================================================================
// API ROUTES
// ============================================================================
// Mount route handlers

// Authentication routes
// POST   /api/auth/login           - Login
// POST   /api/auth/register        - Register
// GET    /api/auth/me              - Current user
// GET    /api/auth/demo-users      - Demo credentials (dev only)
app.use('/api/auth', authRoutes);

// ============================================================================
// 404 - NOT FOUND
// ============================================================================
// This catches any request that didn't match a route above

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.path,
    method: req.method,
  });
});

// ============================================================================
// ERROR HANDLING MIDDLEWARE
// ============================================================================
// This catches any errors that occur during request processing

// Express error handler: must have (err, req, res, next) signature
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err : {},
  });
});

// ============================================================================
// Export the Express app
// ============================================================================
// We export this so index.ts can import it and start listening

export default app;
