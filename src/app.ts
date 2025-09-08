import compression from 'compression';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import config from '@/config/config';
import healthRoutes from '@/routes/health';
import userRoutes from '@/routes/user';
import { auth } from '@/utils/auth';
import { fromNodeHeaders, toNodeHandler } from 'better-auth/node';
import { ErrorMiddleware } from './middleware/errors.middleware';
import { notFoundMiddleware } from './middleware/notFound';

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
app.use('/api/users', userRoutes);
app.get('/api/me', async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  return res.json(session);
});

app.use(notFoundMiddleware);
app.use(ErrorMiddleware);

export default app;
