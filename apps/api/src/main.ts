import Koa from 'koa';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = new Koa();

app.use((ctx) => {
  ctx.body = { message: 'Hello API' };
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
