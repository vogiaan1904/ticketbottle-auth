import { ErrorCodeEnum } from '@/constants/errors';
import { Request, Response } from 'express';

export const notFoundMiddleware = (req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    error: {
      message: `Route ${req.originalUrl} not found`,
      code: ErrorCodeEnum.NotFound,
    },
  });
};
