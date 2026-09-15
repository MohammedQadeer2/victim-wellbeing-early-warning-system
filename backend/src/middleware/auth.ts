// Authentication Middleware
// Verifies JWT token and adds user info to request

import { Request, Response, NextFunction } from 'express';
import { verifyToken, isTokenExpired } from '../utils/jwt';
import { AuthError } from '../utils/errors';
import { AuthenticatedRequest } from '../types/auth';

/**
 * Auth Middleware - Verify JWT Token
 * 
 * Purpose:
 * - Check if request has valid JWT token
 * - Verify token signature (hasn't been tampered with)
 * - Check if token is expired
 * - Extract user info from token
 * - Add user info to req object
 * 
 * Token location:
 * - Authorization header: "Bearer <token>"
 * 
 * Flow:
 * 1. Check if Authorization header exists
 * 2. Extract token from "Bearer <token>"
 * 3. Verify token signature
 * 4. Check if token is expired
 * 5. Add user info to req.user
 * 6. Continue to next middleware/route
 * 
 * If token is missing or invalid:
 * - Return 401 Unauthorized
 * - Don't continue to next middleware
 * 
 * Example usage in route:
 *   router.get('/cases', authMiddleware, getCases)
 *   // Now getCases can access req.user
 * 
 * @param req - Express request with AuthenticatedRequest extension
 * @param res - Express response
 * @param next - Express next function
 */
export function authMiddleware(
  req: Request & AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  try {
    // Get Authorization header
    const authHeader = req.headers.authorization;

    // Check if header exists
    if (!authHeader) {
      res.status(401).json({
        success: false,
        message: 'No authorization header provided',
      });
      return;
    }

    // Extract token from "Bearer <token>"
    const token = authHeader.split(' ')[1];

    // Check if token was extracted correctly
    if (!token) {
      res.status(401).json({
        success: false,
        message: 'Invalid authorization header format. Use "Bearer <token>"',
      });
      return;
    }

    // Check if token is expired (before verification for cleaner error)
    if (isTokenExpired(token)) {
      res.status(401).json({
        success: false,
        message: 'Token has expired',
      });
      return;
    }

    // Verify token signature
    const payload = verifyToken(token);

    // Add user info to request
    // Now accessible in route handlers as req.user
    req.user = {
      id: payload.userId,
      email: payload.email,
      role: payload.role,
    };

    // Continue to next middleware/route handler
    next();
  } catch (error: any) {
    // If it's already an AuthError, pass it through
    if (error instanceof AuthError) {
      res.status(401).json({
        success: false,
        message: error.message,
      });
      return;
    }

    // Unknown error
    res.status(401).json({
      success: false,
      message: 'Authentication failed',
      ...(process.env.NODE_ENV === 'development' && { error: error.message }),
    });
  }
}

/**
 * Optional Auth Middleware
 * 
 * Like authMiddleware but doesn't fail if token is missing
 * Useful for endpoints that have different behavior for authenticated vs anonymous users
 * 
 * If token exists and is valid:
 * - Set req.user with user info
 * - Continue
 * 
 * If token is missing or invalid:
 * - Leave req.user undefined
 * - Continue
 * 
 * Example usage:
 *   router.get('/articles', optionalAuthMiddleware, getArticles)
 *   // Articles show for everyone, but authenticated users see extra content
 * 
 * @param req - Express request
 * @param res - Express response
 * @param next - Express next function
 */
export function optionalAuthMiddleware(
  req: Request & AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  try {
    const authHeader = req.headers.authorization;

    // If no header, just continue without user info
    if (!authHeader) {
      return next();
    }

    // Extract token
    const token = authHeader.split(' ')[1];

    // If can't extract token, just continue
    if (!token) {
      return next();
    }

    // Try to verify token
    const payload = verifyToken(token);

    // Add user info if token is valid
    req.user = {
      id: payload.userId,
      email: payload.email,
      role: payload.role,
    };

    next();
  } catch (error) {
    // Token exists but is invalid - just ignore and continue
    // This is optional auth, so we don't fail
    next();
  }
}
