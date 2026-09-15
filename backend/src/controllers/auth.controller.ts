// Authentication Controller
// Handles HTTP requests for login, register, profile

import { Request, Response } from 'express';
import * as authService from '../services/auth.service';
import { formatErrorResponse, isApiError } from '../utils/errors';
import { AuthenticatedRequest, LoginRequest, RegisterRequest } from '../types/auth';

/**
 * POST /api/auth/login
 * 
 * Login with email and password
 * 
 * Request body:
 *   {
 *     "email": "user@example.com",
 *     "password": "SecurePass123"
 *   }
 * 
 * Response on success (200):
 *   {
 *     "success": true,
 *     "data": {
 *       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
 *       "user": {
 *         "id": "user_123",
 *         "email": "user@example.com",
 *         "name": "John Doe",
 *         "role": "VICTIM"
 *       }
 *     }
 *   }
 * 
 * Response on error (401):
 *   {
 *     "success": false,
 *     "message": "Invalid email or password"
 *   }
 * 
 * @param req - Express request with LoginRequest body
 * @param res - Express response
 */
export async function loginHandler(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body as LoginRequest;

    // Call auth service
    const result = await authService.login(email, password);

    // Send response
    res.status(200).json({
      success: true,
      data: {
        token: result.token,
        user: result.user,
      },
    });
  } catch (error: any) {
    // Format error response
    const errorResponse = formatErrorResponse(error);

    // Send error response with appropriate status
    res.status(errorResponse.status).json(errorResponse);
  }
}

/**
 * POST /api/auth/register
 * 
 * Create new user account
 * 
 * Request body:
 *   {
 *     "email": "newuser@example.com",
 *     "name": "New User",
 *     "password": "SecurePass123",
 *     "role": "VICTIM"  // optional, defaults to VICTIM
 *   }
 * 
 * Response on success (201):
 *   {
 *     "success": true,
 *     "data": {
 *       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
 *       "user": {
 *         "id": "user_456",
 *         "email": "newuser@example.com",
 *         "name": "New User",
 *         "role": "VICTIM"
 *       }
 *     }
 *   }
 * 
 * Response on error (400 or 409):
 *   {
 *     "success": false,
 *     "message": "Email already registered"
 *   }
 * 
 * Password requirements:
 * - At least 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 * 
 * @param req - Express request with RegisterRequest body
 * @param res - Express response
 */
export async function registerHandler(req: Request, res: Response): Promise<void> {
  try {
    const { email, name, password, role = 'VICTIM' } = req.body as RegisterRequest;

    // Call auth service
    const result = await authService.register(email, name, password, role);

    // Send response (201 Created)
    res.status(201).json({
      success: true,
      data: {
        token: result.token,
        user: result.user,
      },
    });
  } catch (error: any) {
    // Format error response
    const errorResponse = formatErrorResponse(error);

    // Send error response with appropriate status
    res.status(errorResponse.status).json(errorResponse);
  }
}

/**
 * GET /api/auth/me
 * 
 * Get current authenticated user info
 * 
 * Requires: Authorization header with valid JWT token
 * 
 * Response on success (200):
 *   {
 *     "success": true,
 *     "data": {
 *       "id": "user_123",
 *       "email": "user@example.com",
 *       "name": "John Doe",
 *       "role": "VICTIM"
 *     }
 *   }
 * 
 * Response on error (401):
 *   {
 *     "success": false,
 *     "message": "No authorization header provided"
 *   }
 * 
 * @param req - Express request with user (from authMiddleware)
 * @param res - Express response
 */
export async function getCurrentUserHandler(
  req: Request & AuthenticatedRequest,
  res: Response
): Promise<void> {
  try {
    // User is set by authMiddleware
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated',
      });
      return;
    }

    // Get fresh user data from service
    const user = await authService.getCurrentUser(req.user.id);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    const errorResponse = formatErrorResponse(error);
    res.status(errorResponse.status).json(errorResponse);
  }
}

/**
 * GET /api/auth/demo-users
 * 
 * Get demo user credentials for testing (DEVELOPMENT ONLY)
 * 
 * Response (200):
 *   {
 *     "success": true,
 *     "data": [
 *       {
 *         "email": "victim@example.com",
 *         "password": "DemoPass123",
 *         "role": "VICTIM",
 *         "name": "Demo Victim"
 *       },
 *       ...
 *     ]
 *   }
 * 
 * WARNING: This endpoint should NOT be in production!
 * It reveals test credentials.
 * 
 * @param req - Express request
 * @param res - Express response
 */
export async function getDemoUsersHandler(req: Request, res: Response): Promise<void> {
  // Only allow in development
  if (process.env.NODE_ENV === 'production') {
    res.status(403).json({
      success: false,
      message: 'This endpoint is only available in development',
    });
    return;
  }

  try {
    const demoUsers = authService.getDemoUsers();

    res.status(200).json({
      success: true,
      data: demoUsers,
      message: 'Demo credentials for testing (development only)',
    });
  } catch (error: any) {
    const errorResponse = formatErrorResponse(error);
    res.status(errorResponse.status).json(errorResponse);
  }
}
