// Password Hashing Utilities
// Safe password hashing and verification using bcrypt

import bcrypt from 'bcrypt';

// Number of salt rounds for bcrypt
// Higher = more secure but slower
// 10 is a good balance for MVP
const SALT_ROUNDS = 10;

/**
 * Hash a plain text password securely
 * 
 * Why bcrypt?
 * - Designed specifically for passwords
 * - Includes salt automatically
 * - Slow by design (prevents brute force)
 * - Industry standard
 * 
 * Example:
 *   const hash = await hashPassword('myPassword123')
 *   // hash: $2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWDeaUvzqxeeUgdm
 * 
 * @param password - Plain text password from user
 * @returns Promise<string> - Hashed password (never store plain text!)
 */
export async function hashPassword(password: string): Promise<string> {
  // Generate salt
  const salt = await bcrypt.genSalt(SALT_ROUNDS);

  // Hash password with salt
  const hash = await bcrypt.hash(password, salt);

  return hash;
}

/**
 * Verify a plain text password against a hash
 * 
 * How it works:
 * 1. User enters password
 * 2. bcrypt hashes it again with same salt from stored hash
 * 3. Compares both hashes
 * 4. Returns true/false
 * 
 * Why this is safe:
 * - Never stores or compares plain text
 * - Even if hashes are stolen, passwords are still safe
 * - Hacker would need to brute force, which is slow with bcrypt
 * 
 * Example:
 *   const isValid = await verifyPassword('myPassword123', storedHash)
 *   // isValid: true or false
 * 
 * @param plainPassword - User-entered password
 * @param hash - Stored password hash from database
 * @returns Promise<boolean> - True if password matches, false otherwise
 */
export async function verifyPassword(plainPassword: string, hash: string): Promise<boolean> {
  // bcrypt.compare hashes plainPassword and compares with hash
  const isMatch = await bcrypt.compare(plainPassword, hash);

  return isMatch;
}

/**
 * Validate password strength
 * 
 * Requirements:
 * - At least 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 * 
 * Example:
 *   validatePasswordStrength('weak') 
 *   // { valid: false, message: 'Password must be at least 8 characters' }
 * 
 *   validatePasswordStrength('SecurePass123')
 *   // { valid: true, message: 'Password is strong' }
 * 
 * @param password - Password to validate
 * @returns { valid: boolean, message: string }
 */
export function validatePasswordStrength(password: string): { valid: boolean; message: string } {
  // Check minimum length
  if (password.length < 8) {
    return {
      valid: false,
      message: 'Password must be at least 8 characters long',
    };
  }

  // Check for uppercase letter
  if (!/[A-Z]/.test(password)) {
    return {
      valid: false,
      message: 'Password must contain at least one uppercase letter',
    };
  }

  // Check for lowercase letter
  if (!/[a-z]/.test(password)) {
    return {
      valid: false,
      message: 'Password must contain at least one lowercase letter',
    };
  }

  // Check for number
  if (!/[0-9]/.test(password)) {
    return {
      valid: false,
      message: 'Password must contain at least one number',
    };
  }

  return {
    valid: true,
    message: 'Password is strong',
  };
}
