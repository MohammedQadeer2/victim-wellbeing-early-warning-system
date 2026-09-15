// Prisma Client Initialization
// This file creates a singleton instance of the Prisma client
// We reuse this instance across the entire backend to avoid creating multiple connections

import { PrismaClient } from '@prisma/client';

// Create a single Prisma client instance
// In production, we want to reuse the same connection
// to avoid connection pool exhaustion
let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  // Production: create a new client
  prisma = new PrismaClient();
} else {
  // Development: reuse client across hot reloads
  // Without this, we'd get connection pool errors on every file save
  const globalWithPrisma = global as typeof globalThis & {
    prisma: PrismaClient;
  };

  if (!globalWithPrisma.prisma) {
    globalWithPrisma.prisma = new PrismaClient({
      log: ['query', 'info', 'warn', 'error'],
    });
  }

  prisma = globalWithPrisma.prisma;
}

// Export the singleton instance
export default prisma;
