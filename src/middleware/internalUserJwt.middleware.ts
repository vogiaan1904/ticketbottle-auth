import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '@/config/config';

interface InternalUserContext {
  userId: string;
  email?: string;
  name?: string;
  token_type?: string;
  exp?: number;
  iat?: number;
}

export const internalUserJwt = (
  req: Request & { userCtx?: InternalUserContext },
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'Missing Authorization header' });
      return;
    }

    const token = authHeader.slice('Bearer '.length);
    const secret = config.internalKey;

    const payload = jwt.verify(token, secret) as InternalUserContext;

    if (payload.token_type && payload.token_type !== 'user') {
      res.status(401).json({ message: 'Invalid token type' });
      return;
    }

    req.userCtx = payload;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ message: 'Token expired' });
    } else if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ message: 'Invalid token' });
    } else {
      res.status(401).json({ message: 'Authentication failed' });
    }
  }
};
