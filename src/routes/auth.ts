import { Router } from 'express';
import { z } from 'zod';
import asyncHandler from 'express-async-handler';
import { validate } from '@/utils/validate.js';
import { authController } from '@/controllers/authController.js';

const router = Router();

/**
 * Auth routes are automatically handled by BetterAuth via the toNodeHandler middleware in app.ts
 *
 * Available routes:
 * - POST /api/auth/signup - Register a new user with email and password
 * - POST /api/auth/signin - Sign in with email and password
 * - POST /api/auth/signout - Sign out the current user
 * - GET /api/auth/session - Get the current user session
 * - GET /api/auth/providers/google - Start Google OAuth flow
 * - GET /api/auth/callback/google - Google OAuth callback
 */

/**
 * Get the current user's session/profile
 */
router.get('/me', asyncHandler(authController.getMe.bind(authController)));

/**
 * Change password schema
 */
const changePasswordSchema = z.object({
  body: z.object({
    currentPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters'),
    newPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .refine(
        (password) => /[A-Z]/.test(password),
        'Password must contain at least one uppercase letter'
      )
      .refine(
        (password) => /[a-z]/.test(password),
        'Password must contain at least one lowercase letter'
      )
      .refine(
        (password) => /[0-9]/.test(password),
        'Password must contain at least one number'
      ),
    revokeOtherSessions: z.boolean().optional().default(false),
  }),
});

/**
 * Change user password
 */
router.post(
  '/change-password',
  validate(changePasswordSchema),
  asyncHandler(authController.changePassword.bind(authController))
);

/**
 * Check if user is authenticated
 */
router.get(
  '/check',
  asyncHandler(authController.checkAuth.bind(authController))
);

export default router;
