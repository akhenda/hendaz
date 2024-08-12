import { cleanEnv, email, str } from 'envalid';

export const env = cleanEnv(process.env, {
  ADMIN_EMAIL: email({ default: 'admin@example.com' }),
  NEXT_PUBLIC_CONVEX_URL: str(),
  NODE_ENV: str({ choices: ['development', 'test', 'production', 'staging'] }),
});

export default env;
