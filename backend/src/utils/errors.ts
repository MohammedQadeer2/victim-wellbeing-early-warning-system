// Custom Error Classes
// Consistent error handling across the backend

/**
 * Base error class for all API errors
 * 
 * Benefits:
 * - Consistent error structure
 * - HTTP status codes
 * - Error messages
 * - Stack traces for debugging
 * 
 * Example:
 *   throw new ApiError(400, 'Email already exists')
 */
export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public details?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Authentication error (401)
 * User failed to authenticate or token is invalid
 * 
 * Example:
 *   throw new AuthError('Invalid email or password')
 */
export class AuthError extends ApiError {
  constructor(message: string = 'Authentication failed', details?: any) {
    super(401, message, details);
    this.name = 'AuthError';
  }
}

/**
 * Authorization error (403)
 * User is authenticated but doesn't have permission
 * 
 * Example:
 *   throw new AuthorizationError('Only counsellors can access this')
 */
export class AuthorizationError extends ApiError {
  constructor(message: string = 'Access denied', details?: any) {
    super(403, message, details);
    this.name = 'AuthorizationError';
  }
}

/**
 * Validation error (400)
 * Input data doesn't meet requirements
 * 
 * Example:
 *   throw new ValidationError('Email is invalid')
 */
export class ValidationError extends ApiError {
  constructor(message: string = 'Validation failed', details?: any) {
    super(400, message, details);
    this.name = 'ValidationError';
  }
}

/**
 * Not found error (404)
 * Resource doesn't exist
 * 
 * Example:
 *   throw new NotFoundError('User not found')
 */
export class NotFoundError extends ApiError {
  constructor(message: string = 'Resource not found', details?: any) {
    super(404, message, details);
    this.name = 'NotFoundError';
  }
}

/**
 * Conflict error (409)
 * Resource already exists
 * 
 * Example:
 *   throw new ConflictError('Email already registered')
 */
export class ConflictError extends ApiError {
  constructor(message: string = 'Conflict', details?: any) {
    super(409, message, details);
    this.name = 'ConflictError';
  }
}

/**
 * Server error (500)
 * Unexpected error on backend
 * 
 * Example:
 *   throw new ServerError('Failed to send email')
 */
export class ServerError extends ApiError {
  constructor(message: string = 'Internal server error', details?: any) {
    super(500, message, details);
    this.name = 'ServerError';
  }
}

/**
 * Check if error is an API error
 * 
 * Example:
 *   if (isApiError(err)) {
 *     res.status(err.status).json({ message: err.message })
 *   }
 */
export function isApiError(error: any): error is ApiError {
  return error instanceof ApiError && 'status' in error && 'message' in error;
}

/**
 * Format error for response
 * 
 * Example:
 *   const errorResponse = formatErrorResponse(error)
 *   res.status(errorResponse.status).json(errorResponse)
 */
export function formatErrorResponse(error: any) {
  if (isApiError(error)) {
    return {
      success: false,
      message: error.message,
      status: error.status,
      ...(process.env.NODE_ENV === 'development' && { details: error.details }),
    };
  }

  // Unknown error
  return {
    success: false,
    message: 'Internal server error',
    status: 500,
    ...(process.env.NODE_ENV === 'development' && { error: error.message }),
  };
}
