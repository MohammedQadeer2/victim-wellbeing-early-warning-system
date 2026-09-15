// Role-Based Access Control (RBAC) Middleware
// Enforce role-based authorization on routes

import { Request, Response, NextFunction } from 'express';
import { AuthorizationError } from '../utils/errors';
import { AuthenticatedRequest } from '../types/auth';
import { UserRole } from '../types/auth';

/**
 * Role-Based Authorization Middleware
 * 
 * Purpose:
 * - Check if user has required role
 * - Deny access if user role not in allowed list
 * - Allow access if user has required role
 * 
 * How it works:
 * 1. Check if req.user exists (set by authMiddleware)
 * 2. Get user's role from req.user
 * 3. Compare with required roles
 * 4. Allow or deny access
 * 
 * Roles in system:
 * - VICTIM: Can see own data
 * - COUNSELLOR: Can see assigned cases
 * - AUTHORITY: Can see all cases
 * 
 * Example usage:
 *   // Only counsellors and authorities can access this
 *   router.get('/cases', authMiddleware, roleMiddleware(['COUNSELLOR', 'AUTHORITY']), getCases)
 * 
 *   // Only authorities can access this
 *   router.get('/analytics', authMiddleware, roleMiddleware(['AUTHORITY']), getAnalytics)
 * 
 *   // Anyone can access (no role check)
 *   router.get('/profile', authMiddleware, getProfile)
 * 
 * @param allowedRoles - Array of roles that can access this endpoint
 * @returns Express middleware function
 */
export function roleMiddleware(allowedRoles: UserRole[]) {
  return (req: Request & AuthenticatedRequest, res: Response, next: NextFunction): void => {
    try {
      // Check if user is authenticated
      // (should be set by authMiddleware)
      if (!req.user) {
        throw new AuthorizationError('User not authenticated');
      }

      // Get user's role
      const userRole = req.user.role;

      // Check if user's role is in allowed list
      if (!allowedRoles.includes(userRole)) {
        throw new AuthorizationError(
          `This endpoint requires one of these roles: ${allowedRoles.join(', ')}. You have role: ${userRole}`
        );
      }

      // User has required role, continue
      next();
    } catch (error: any) {
      if (error instanceof AuthorizationError) {
        return res.status(403).json({
          success: false,
          message: error.message,
        });
      }

      return res.status(403).json({
        success: false,
        message: 'Access denied',
      });
    }
  };
}

/**
 * Admin-only middleware (convenience wrapper)
 * 
 * Allows only AUTHORITY role
 * 
 * Example:
 *   router.post('/system/settings', authMiddleware, adminOnly, updateSettings)
 */
export function adminOnly(
  req: Request & AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  roleMiddleware(['AUTHORITY'])(req, res, next);
}

/**
 * Counsellor-or-admin middleware (convenience wrapper)
 * 
 * Allows COUNSELLOR or AUTHORITY roles
 * 
 * Example:
 *   router.get('/cases', authMiddleware, counsellorOrAdmin, getCases)
 */
export function counsellorOrAdmin(
  req: Request & AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  roleMiddleware(['COUNSELLOR', 'AUTHORITY'])(req, res, next);
}

/**
 * Verify user owns resource (data ownership check)
 * 
 * Purpose:
 * - Prevent user A from viewing user B's data
 * - Even if user B has correct role
 * 
 * Example:
 * A VICTIM user should only see their own case, not other victims' cases
 * A COUNSELLOR should only see assigned cases, not all cases
 * An AUTHORITY can see all cases
 * 
 * Example usage:
 *   router.get('/cases/:id', authMiddleware, async (req, res) => {
 *     const case = await getCaseById(req.params.id)
 *     requireOwnership(req, case.victimId, 'AUTHORITY')
 *     res.json(case)
 *   })
 * 
 * @param req - Express request with user
 * @param resourceOwnerId - ID of resource owner
 * @param adminRole - Role that bypasses ownership check (usually AUTHORITY)
 * @throws AuthorizationError if user doesn't own resource and isn't admin
 */
export function requireOwnership(
  req: Request & AuthenticatedRequest,
  resourceOwnerId: string,
  adminRole: UserRole = 'AUTHORITY'
): void {
  if (!req.user) {
    throw new AuthorizationError('User not authenticated');
  }

  // Admin role can access any resource
  if (req.user.role === adminRole) {
    return;
  }

  // Check if user owns the resource
  if (req.user.id !== resourceOwnerId) {
    throw new AuthorizationError('You do not have permission to access this resource');
  }
}

/**
 * Check if user has any of the required roles
 * 
 * Useful for complex permission checks
 * 
 * Example:
 *   if (hasRole(req, ['COUNSELLOR', 'AUTHORITY'])) {
 *     // User can manage cases
 *   }
 * 
 * @param req - Express request with user
 * @param roles - Array of roles to check
 * @returns boolean - True if user has any of the roles
 */
export function hasRole(req: Request & AuthenticatedRequest, roles: UserRole[]): boolean {
  if (!req.user) return false;
  return roles.includes(req.user.role);
}

/**
 * Get user's role
 * 
 * Convenience function to safely get user role
 * 
 * @param req - Express request with user
 * @returns UserRole or undefined
 */
export function getUserRole(req: Request & AuthenticatedRequest): UserRole | undefined {
  return req.user?.role;
}
