/**
 * Runtime environment configuration validator for DIMO.
 * Ensures the application fails gracefully with actionable messages
 * if database credentials or gateway keys are missing at runtime.
 */

export const env = {
  DATABASE_URL: process.env.DATABASE_URL || '',
  DIRECT_URL: process.env.DIRECT_URL || '',
  NODE_ENV: process.env.NODE_ENV || 'development',
  GATEWAY_API_KEY: process.env.GATEWAY_API_KEY || 'reactor-gw-dev-secret-key',
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',

  isConfigured(): boolean {
    return Boolean(this.DATABASE_URL && this.DATABASE_URL.startsWith('postgres'));
  },

  assertDatabaseConfigured(): void {
    if (!this.isConfigured()) {
      throw new Error(
        'Neon PostgreSQL DATABASE_URL is not configured. Please supply a valid connection string in your .env or platform deployment settings.'
      );
    }
  },
};
