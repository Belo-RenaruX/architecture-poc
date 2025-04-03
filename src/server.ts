import { app } from './app.ts';

const startServer = async () => {
  try {
    await app.listen({ host: '0.0.0.0', port: 3000 });
  } catch (error) {
    process.exit(1);
  }
};

startServer();

export default app;
