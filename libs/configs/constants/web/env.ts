import { zenv } from 'next-zodenv';
import { z } from 'zod';

export interface CleanedEnvAccessors {
  /** true if NODE_ENV === 'development' */
  readonly isDevelopment: boolean;
  readonly isDev: boolean;

  /** true if NODE_ENV === 'test' */
  readonly isTest: boolean;

  /** true if NODE_ENV === 'production' */
  readonly isProduction: boolean;
  readonly isProd: boolean;
}

// https://github.com/morinokami/next-zodenv/tree/main#nextjs
const env = zenv({
  ADMIN_EMAIL: { value: 'admin@example.com', zodType: z.string().email().optional() },
  NEXT_PUBLIC_CONVEX_URL: { value: process.env.NEXT_PUBLIC_CONVEX_URL, zodType: z.string() },
  NODE_ENV: z.enum(['development', 'test', 'production', 'staging']).optional(),
});

const nodeEnv = env.NODE_ENV;

// If NODE_ENV is not set, assume production
const isProd = !nodeEnv || nodeEnv === 'production';

Object.defineProperties(env, {
  isDev: { value: nodeEnv === 'development' },
  isDevelopment: { value: nodeEnv === 'development' },
  isProd: { value: isProd },
  isProduction: { value: isProd },
  isTest: { value: nodeEnv === 'test' },
});

export default env as typeof env & CleanedEnvAccessors;
