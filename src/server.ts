import { app } from "./app";

const startServer = async () => {
  try {
    await app.listen({ port: 3000 });
    console.log('🚀 Server running at http://localhost:3000');
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

startServer();

export default app;