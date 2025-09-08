import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';

import config from '@/config/index.js';
import healthRoutes from '@/routes/health.js';
import authRoutes from '@/routes/auth.js';
import userRoutes from '@/routes/user.js';
import { auth } from '@/utils/auth.js';
import { toNodeHandler } from 'better-auth/node';
import { ErrorMiddleware } from './middleware/errorMiddleware';

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: config.corsOrigin,
    credentials: true,
  })
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
});
app.use('/api/', limiter);

app.use(compression());
app.use(morgan('combined'));

app.all('/api/auth/*splat', toNodeHandler(auth));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.use(ErrorMiddleware);

export default app;
