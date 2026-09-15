// Authentication Routes
// Define authentication endpoints

import express, { Router } from 'express';
import {
  loginHandler,
  registerHandler,
  getCurrentUserHandler,
  getDemoUsersHandler,
} from '../controllers/auth.controller';
import { authMiddleware } from '../middleware/auth';

const router: Router = express.Router();

/**
 * POST /api/auth/login
 * Login with email and password
 * No auth required (public endpoint)
 */
router.post('/login', loginHandler);

/**
 * POST /api/auth/register
 * Create new user account
 * No auth required (public endpoint)
 */
router.post('/register', registerHandler);

/**
 * GET /api/auth/me
 * Get current authenticated user
 * Requires: Valid JWT token
 */
router.get('/me', authMiddleware, getCurrentUserHandler);

/**
 * GET /api/auth/demo-users
 * Get demo user credentials for testing (DEVELOPMENT ONLY)
 * No auth required but only available in development
 */
router.get('/demo-users', getDemoUsersHandler);

export default router;
