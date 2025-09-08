import dotenv from 'dotenv';
import type { Config } from '@/types/index.js';

dotenv.config();

const config: Config = {
  port: parseInt(process.env.PORT || '3001', 10),
  host: process.env.HOST || 'localhost',
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  betterAuthSecret:
    process.env.BETTER_AUTH_SECRET || 'fallback-secret-change-in-production',
  databaseUrl: process.env.DATABASE_URL || '',
};

export default config;
