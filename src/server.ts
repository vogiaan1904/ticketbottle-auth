import app from './app';
import config from '@/config/config';
import http from 'http';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();
const server = http.createServer(app);

function gracefulShutdown(signal?: string): void {
  console.log(`Shutdown initiated${signal ? ` (${signal})` : ''}`);

  const forceExit = setTimeout(() => {
    console.error('Could not close connections in time, forcing exit');
  }, 5000);

  forceExit.unref();

  server.close(async () => {
    console.log('HTTP server closed');

    try {
      await prisma.$disconnect();
      console.log('Database connections closed');
      clearTimeout(forceExit);
    } catch (err) {
      console.error('Error during database disconnect:', err);
      clearTimeout(forceExit);
    }
  });
}

// Handle signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle uncaught errors
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
  gracefulShutdown();
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  gracefulShutdown();
});

// Start server
server.listen(config.port, config.host, () => {
  console.log(`Server running on http://${config.host}:${config.port}`);
  console.log(`Environment: ${config.nodeEnv}`);
});
