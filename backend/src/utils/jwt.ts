// JWT (JSON Web Token) Utilities
// Token generation and verification for stateless authentication

import jwt from 'jsonwebtoken';
import { JwtPayload, UserRole } from '../types/auth';

// JWT secret from environment variables
// NEVER hardcode this!
// In production, use strong random string and rotate regularly
const JWT_SECRET = process.env.JWT_SECRET || 'development-secret-key-change-in-production';

// Token expiration: 24 hours
const TOKEN_EXPIRY = '24h';

/**
 * Generate a JWT token for authenticated user
 * 
 * How JWT works:
 * 1. Create payload object with user data
 * 2. Sign it with secret key
 * 3. Result is a token string (looks like: xxxxx.yyyyy.zzzzz)
 * 4. Token is cryptographically signed, can't be forged
 * 5. Token can be decoded without secret, but can't be modified
 * 
 * Token structure:
 *   Header.Payload.Signature
 *   - Header: Token type and hash algorithm
 *   - Payload: User data (encoded, not encrypted)
 *   - Signature: Proof that payload wasn't modified
 * 
 * Security:
 * - Token is sent in HTTP header: Authorization: Bearer <token>
 * - Client stores token and sends with every request
 * - Server verifies signature to ensure it's legitimate
 * - Expired tokens are rejected
 * 
 * Example:
 *   const token = generateToken('user_123', 'john@example.com', 'VICTIM')
 *   // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ..."
 * 
 * @param userId - User ID to encode
 * @param email - User email
 * @param role - User role (VICTIM, COUNSELLOR, AUTHORITY)
 * @returns string - JWT token
 */
export function generateToken(userId: string, email: string, role: UserRole): string {
  // Create payload with user info
  const payload: Omit<JwtPayload, 'iat' | 'exp'> = {
    userId,
    email,
    role,
  };

  // Sign the token
  // jwt.sign adds iat (issued at) and exp (expiration) automatically
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: TOKEN_EXPIRY,
    algorithm: 'HS256',
  });

  return token;
}

/**
 * Verify and decode a JWT token
 * 
 * Process:
 * 1. Extract token from string (remove "Bearer " prefix if present)
 * 2. Verify signature with secret key
 * 3. Check if token is expired
 * 4. Return decoded payload if valid
 * 5. Throw error if invalid
 * 
 * Example success:
 *   const payload = verifyToken(token)
 *   // payload: { userId: '123', email: 'john@example.com', role: 'VICTIM' }
 * 
 * Example error:
 *   verifyToken('invalid-token')
 *   // throws: JsonWebTokenError
 * 
 * @param token - JWT token to verify
 * @returns JwtPayload - Decoded token payload
 * @throws Error if token is invalid or expired
 */
export function verifyToken(token: string): JwtPayload {
  // Remove "Bearer " prefix if present
  // Frontend sends: "Authorization: Bearer eyJhbGc..."
  // We receive: "eyJhbGc..."
  const cleanToken = token.replace(/^Bearer\s+/i, '');

  try {
    // Verify and decode the token
    const payload = jwt.verify(cleanToken, JWT_SECRET, {
      algorithms: ['HS256'],
    }) as JwtPayload;

    return payload;
  } catch (error: any) {
    // Common JWT errors:
    if (error.name === 'TokenExpiredError') {
      throw new Error('Token has expired');
    }
    if (error.name === 'JsonWebTokenError') {
      throw new Error('Invalid token');
    }
    throw error;
  }
}

/**
 * Decode a token WITHOUT verifying signature
 * 
 * WARNING: Use only for debugging/inspection!
 * Never trust decoded data without verification
 * 
 * Why we have this:
 * - Sometimes need to see token contents in logs
 * - Debugging token issues
 * - Inspecting token before verification
 * 
 * @param token - JWT token to decode
 * @returns any - Decoded payload (NOT VERIFIED)
 */
export function decodeToken(token: string): any {
  const cleanToken = token.replace(/^Bearer\s+/i, '');
  const decoded = jwt.decode(cleanToken);
  return decoded;
}

/**
 * Check if token is expired
 * 
 * Example:
 *   if (isTokenExpired(token)) {
 *     // Request new token
 *   }
 * 
 * @param token - JWT token to check
 * @returns boolean - True if expired, false otherwise
 */
export function isTokenExpired(token: string): boolean {
  try {
    const payload = decodeToken(token) as any;
    if (!payload || !payload.exp) return true;

    // exp is in seconds, Date.now() is in milliseconds
    return Date.now() >= payload.exp * 1000;
  } catch {
    return true;
  }
}

/**
 * Get remaining time until token expires (in seconds)
 * 
 * Example:
 *   const remaining = getTokenExpiry(token)
 *   console.log(`Token expires in ${remaining} seconds`)
 * 
 * @param token - JWT token
 * @returns number - Seconds until expiration (negative if already expired)
 */
export function getTokenExpiry(token: string): number {
  try {
    const payload = decodeToken(token) as any;
    if (!payload || !payload.exp) return 0;

    // Convert seconds to milliseconds for Date.now()
    const expiresAt = payload.exp * 1000;
    const now = Date.now();
    const remaining = expiresAt - now;

    // Return in seconds
    return Math.floor(remaining / 1000);
  } catch {
    return 0;
  }
}
