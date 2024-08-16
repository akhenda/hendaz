/**
 * These are configuration settings for the Prod environment.
 *
 * Do not include API secrets in this file or anywhere in your JS.
 *
 * https://reactnative.dev/docs/security#storing-sensitive-info
 */
import { bool, cleanEnv, email, str } from 'envalid';

const prod = cleanEnv(process.env, {
  ADMIN_EMAIL: email({ default: 'admin@example.com' }),
  NODE_ENV: str({ choices: ['development', 'test', 'production', 'staging'] }),
  USE_REACTOTRON: bool({ default: false }),
  USE_REDUX_DEV_TOOLS: bool({ default: false }),
  USE_REDUX_LOGGER: bool({ default: false }),
  USE_ZUSTAND_DEV_TOOLS: bool({ default: false }),
});

export default prod;
