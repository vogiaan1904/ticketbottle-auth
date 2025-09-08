import { userController } from '@/controllers/userController.js';
import { internalUserJwt } from '@/middleware/internalUserJwt';
import { validate } from '@/utils/validate.js';
import { Router } from 'express';
import { z } from 'zod';

const router = Router();

const updateUserSchema = z.object({
  params: z.object({
    id: z.string(),
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

router.use(internalUserJwt);

router.patch(
  '/update/:id',
  internalUserJwt,
  validate(updateUserSchema),
  userController.updateProfile
);

export default router;
