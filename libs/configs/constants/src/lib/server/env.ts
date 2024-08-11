import { str, email, json } from 'envalid';

export const env = {
  API_KEY: str(),
  ADMIN_EMAIL: email({ default: 'admin@example.com' }),
  EMAIL_CONFIG_JSON: json({ desc: 'Additional email parameters' }),
  NODE_ENV: str({ choices: ['development', 'test', 'production', 'staging'] }),
};

export default env;
