import { Router } from 'express';
import { z } from 'zod';
import { validate } from '@/utils/validate.js';
import { userController } from '@/controllers/userController.js';
import { requireAuth, checkUserAccess } from '@/middleware/auth.js';

const router = Router();

const updateUserSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid user ID format'),
  }),
  body: z.object({
    name: z.string().min(2).optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zip: z.string().optional(),
    country: z.string().optional(),
  }),
});

router.patch(
  '/update/:id',
  requireAuth,
  checkUserAccess,
  validate(updateUserSchema),
  userController.updateProfile
);

export default router;
