import { Request, Response } from 'express';
import { fromNodeHeaders } from 'better-auth/node';
import { auth } from '@/utils/auth.js';
import { sendResponse } from '@/utils/response.js';

export class AuthController {
  async getMe(req: Request, res: Response): Promise<void> {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      sendResponse.unauthorized(res);
      return;
    }

    sendResponse.success(res, session);
  }

  async changePassword(req: Request, res: Response): Promise<void> {
    const { currentPassword, newPassword, revokeOtherSessions } = req.body;

    await auth.api.changePassword({
      body: {
        currentPassword,
        newPassword,
        revokeOtherSessions,
      },
      headers: fromNodeHeaders(req.headers),
    });

    sendResponse.success(res, null, 'Password changed successfully');
  }

  async checkAuth(req: Request, res: Response): Promise<void> {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    sendResponse.success(res, {
      authenticated: !!session,
      user: session?.user || null,
    });
  }
}

export const authController = new AuthController();
