import config from '@/config/config.js';
import { ErrorCode, ErrorCodeEnum } from '@/constants/errors.constant';
import { BusinessException } from '@/exceptions/business.exception.js';
import { APIError } from 'better-auth/api';
import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

export const ErrorMiddleware = (
  err: Error & { status?: number },
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error:', err);

  if (err instanceof ZodError) {
    const [message, status] = ErrorCode[ErrorCodeEnum.ValidationError];
    res.status(status).json({
      success: false,
      error: {
        message,
        code: ErrorCodeEnum.ValidationError,
      },
    });
    return;
  }

  if (err instanceof APIError) {
    res.status(err.status || 500).json({
      success: false,
      error: {
        message: err.body?.message,
        code: err.body?.code,
      },
    });
    return;
  }

  if (err instanceof BusinessException) {
    res.status(err.statusCode).json({
      success: false,
      error: {
        message: err.message,
        code: err.code,
      },
    });
    return;
  }

  const statusCode = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      code: ErrorCodeEnum.InternalServerError,
      ...(config.nodeEnv === 'development' && { stack: err.stack }),
    },
  });
};
