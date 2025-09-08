import { Response } from 'express';

/**
 * Standard API response format
 */
export const sendResponse = {
  success: <T>(
    res: Response,
    data?: T,
    message: string = 'OK',
    statusCode = 200
  ) => {
    return res.status(statusCode).json({
      success: true,
      ...(data && { data }),
      ...(message && { message }),
    });
  },

  error: (
    res: Response,
    message = 'Internal server error',
    statusCode = 500,
    details?: any
  ) => {
    return res.status(statusCode).json({
      success: false,
      error: {
        message,
        ...(details && { details }),
      },
    });
  },

  unauthorized: (res: Response, message = 'Unauthorized') => {
    return sendResponse.error(res, message, 401);
  },

  forbidden: (res: Response, message = 'Forbidden') => {
    return sendResponse.error(res, message, 403);
  },

  notFound: (res: Response, message = 'Resource not found') => {
    return sendResponse.error(res, message, 404);
  },
};
