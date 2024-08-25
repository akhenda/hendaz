import { cleanEnv, email, str } from 'envalid';

const env = cleanEnv(process.env, {
  ADMIN_EMAIL: email({ default: 'admin@example.com' }),
  CLERK_HOSTNAME: str({ default: '' }),
  CLERK_WEBHOOK_SECRET: str({ default: '', desc: 'This should be configured on Convex Dashboard' }),
  NODE_ENV: str({ choices: ['development', 'test', 'production', 'staging'] }),
});

export default env;
