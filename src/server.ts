import app from './app.js';
import config from '@/config/index.js';

const startServer = (): void => {
  try {
    app.listen(config.port, config.host, () => {
      console.log(`🚀 Server running on http://${config.host}:${config.port}`);
      console.log(`📝 Environment: ${config.nodeEnv}`);
      console.log(
        `🔗 Health check: http://${config.host}:${config.port}/api/health`
      );
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

process.on('unhandledRejection', (reason: unknown) => {
  console.error('Unhandled Rejection at:', reason);
  process.exit(1);
});

process.on('uncaughtException', (error: Error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

startServer();
