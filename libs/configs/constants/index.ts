import mobile from './client/mobile';
import web from './client/web';
import server from './server';

export { default as mobile } from './client/mobile';
export { default as web } from './client/web';
export { default as server } from './server';

const config = {
  mobile,
  server,
  web,
};

export default config;
