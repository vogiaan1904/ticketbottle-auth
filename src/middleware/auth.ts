import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { fromNodeHeaders } from 'better-auth/node';
import { auth } from '@/utils/auth.js';
import { sendResponse } from '@/utils/response.js';
import { RequestWithUser } from '@/types';

export const requireAuth = asyncHandler(
  async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      sendResponse.unauthorized(res);
      return;
    }

    req.user = session.user;
    next();
  }
);

export const checkUserAccess = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
): void => {
  const { id } = req.params;

  if (req.user?.id !== id) {
    sendResponse.forbidden(res, 'You can only update your own profile');
    return;
  }

  next();
};
