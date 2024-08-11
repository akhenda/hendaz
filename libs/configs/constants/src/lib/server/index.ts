import { cleanEnv } from 'envalid';

import base from './base';
import env from './env';

const config = { ...env, ...base };

export default cleanEnv(process.env, config);
