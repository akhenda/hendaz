/**
 * These are configuration settings for the dev environment.
 *
 * Do not include API secrets in this file or anywhere in your JS.
 *
 * https://reactnative.dev/docs/security#storing-sensitive-info
 */
import { str, email, json, bool } from 'envalid';

export const dev = {
  API_KEY: str(),
  ADMIN_EMAIL: email({ default: 'admin@example.com' }),
  EMAIL_CONFIG_JSON: json({ desc: 'Additional email parameters' }),
  NODE_ENV: str({ choices: ['development', 'test', 'production', 'staging'] }),
  USE_ZUSTAND_DEV_TOOLS: bool({ default: true }),
  USE_REACTOTRON: bool({ default: true }),
  USE_REDUX_LOGGER: bool({ default: true }),
  USE_REDUX_DEV_TOOLS: bool({ default: true }),
};

export default dev;
