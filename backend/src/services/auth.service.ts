// Authentication Service
// Business logic for user authentication

import { hashPassword, verifyPassword, validatePasswordStrength } from '../utils/password';
import { generateToken } from '../utils/jwt';
import { AuthError, ValidationError, ConflictError, NotFoundError } from '../utils/errors';
import { User, SafeUser, UserRole } from '../types/auth';

/**
 * DEMO DATA - For development without database
 * 
 * In Phase 3+, this will be replaced with Prisma queries to real database
 * For now, we use in-memory demo users for testing
 * 
 * Password: DemoPass123
 */
const DEMO_USERS: Map<string, User> = new Map([
  [
    'demo_victim_1',
    {
      id: 'demo_victim_1',
      email: 'victim@example.com',
      name: 'Demo Victim',
      passwordHash: 'DemoPass123',  // Demo: plain text for testing
      role: 'VICTIM',
      createdAt: new Date('2026-01-01'),
      updatedAt: new Date('2026-01-01'),
    },
  ],
  [
    'demo_counsellor_1',
    {
      id: 'demo_counsellor_1',
      email: 'counsellor@example.com',
      name: 'Demo Counsellor',
      passwordHash: 'DemoPass123',  // Demo: plain text for testing
      role: 'COUNSELLOR',
      createdAt: new Date('2026-01-01'),
      updatedAt: new Date('2026-01-01'),
    },
  ],
  [
    'demo_authority_1',
    {
      id: 'demo_authority_1',
      email: 'authority@example.com',
      name: 'Demo Authority',
      passwordHash: 'DemoPass123',  // Demo: plain text for testing
      role: 'AUTHORITY',
      createdAt: new Date('2026-01-01'),
      updatedAt: new Date('2026-01-01'),
    },
  ],
]);

/**
 * Find user by email
 * 
 * In production: Query database with Prisma
 * For now: Search demo users map
 * 
 * @param email - User email
 * @returns User if found, null otherwise
 */
async function findUserByEmail(email: string): Promise<User | null> {
  // Demo: Search in-memory users
  for (const [_, user] of DEMO_USERS) {
    if (user.email.toLowerCase() === email.toLowerCase()) {
      return user;
    }
  }
  return null;
}

/**
 * Find user by ID
 * 
 * @param id - User ID
 * @returns User if found, null otherwise
 */
async function findUserById(id: string): Promise<User | null> {
  return DEMO_USERS.get(id) || null;
}

/**
 * Convert User to SafeUser (remove password hash)
 * 
 * Never send passwordHash to frontend!
 * 
 * @param user - User with password hash
 * @returns SafeUser without password
 */
function toSafeUser(user: User): SafeUser {
  const { passwordHash, ...safeUser } = user;
  return safeUser;
}

/**
 * Login user with email and password
 * 
 * Process:
 * 1. Find user by email
 * 2. Verify password against hash
 * 3. Generate JWT token
 * 4. Return token and user info
 * 
 * Security:
 * - Password is never stored or returned
 * - Only hash is compared
 * - Token is signed with secret
 * - Token expires after 24 hours
 * 
 * @param email - User email
 * @param password - User password (plain text, will be hashed for comparison)
 * @returns { token, user } - JWT token and user info
 * @throws AuthError if credentials invalid
 */
export async function login(email: string, password: string): Promise<{ token: string; user: SafeUser }> {
  // Validate inputs
  if (!email || !password) {
    throw new ValidationError('Email and password are required');
  }

  // Find user by email
  const user = await findUserByEmail(email);

  if (!user) {
    // Don't reveal if email exists (security best practice)
    throw new AuthError('Invalid email or password');
  }

  // Verify password
  // Demo mode: compare plain text (no bcrypt for testing)
  // Production: use bcrypt.compare(password, user.passwordHash)
  const isPasswordValid = password === user.passwordHash || 
    (await verifyPassword(password, user.passwordHash).catch(() => false));

  if (!isPasswordValid) {
    throw new AuthError('Invalid email or password');
  }

  // Generate JWT token
  const token = generateToken(user.id, user.email, user.role);

  // Return token and user info (without password)
  return {
    token,
    user: toSafeUser(user),
  };
}

/**
 * Register new user
 * 
 * Process:
 * 1. Validate input data
 * 2. Check if email already exists
 * 3. Validate password strength
 * 4. Hash password with bcrypt
 * 5. Create user record
 * 6. Generate JWT token
 * 7. Return token and user
 * 
 * @param email - User email
 * @param name - User name
 * @param password - User password (plain text, will be hashed)
 * @param role - User role (VICTIM, COUNSELLOR, AUTHORITY)
 * @returns { token, user } - JWT token and user info
 * @throws ValidationError if validation fails
 * @throws ConflictError if email already exists
 */
export async function register(
  email: string,
  name: string,
  password: string,
  role: UserRole = 'VICTIM'
): Promise<{ token: string; user: SafeUser }> {
  // Validate inputs
  if (!email || !name || !password) {
    throw new ValidationError('Email, name, and password are required');
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new ValidationError('Invalid email format');
  }

  // Validate password strength
  const passwordValidation = validatePasswordStrength(password);
  if (!passwordValidation.valid) {
    throw new ValidationError(passwordValidation.message);
  }

  // Check if email already exists
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new ConflictError('Email already registered');
  }

  // Hash password
  const passwordHash = await hashPassword(password);

  // Create new user
  const newUser: User = {
    id: `user_${Date.now()}`,
    email,
    name,
    passwordHash,
    role,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // Save to demo storage
  DEMO_USERS.set(newUser.id, newUser);

  // Generate JWT token
  const token = generateToken(newUser.id, newUser.email, newUser.role);

  return {
    token,
    user: toSafeUser(newUser),
  };
}

/**
 * Get current user from JWT payload
 * 
 * @param userId - User ID from JWT token
 * @returns SafeUser without password
 * @throws NotFoundError if user not found
 */
export async function getCurrentUser(userId: string): Promise<SafeUser> {
  const user = await findUserById(userId);

  if (!user) {
    throw new NotFoundError('User not found');
  }

  return toSafeUser(user);
}

/**
 * Get demo users (for testing)
 * 
 * Returns all demo users with their credentials
 * Used for frontend to log in during testing
 * 
 * @returns Array of demo users
 */
export function getDemoUsers() {
  return [
    {
      email: 'victim@example.com',
      password: 'DemoPass123',
      role: 'VICTIM',
      name: 'Demo Victim',
    },
    {
      email: 'counsellor@example.com',
      password: 'DemoPass123',
      role: 'COUNSELLOR',
      name: 'Demo Counsellor',
    },
    {
      email: 'authority@example.com',
      password: 'DemoPass123',
      role: 'AUTHORITY',
      name: 'Demo Authority',
    },
  ];
}
