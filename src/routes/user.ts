import { userController } from '@/controllers/user.controller.js';
import { internalUserJwt } from '@/middleware/internalUserJwt.middleware';
import { UpdateUserSchema } from '@/schemas/user.schema';
import { validate } from '@/utils/validate.js';
import { Router } from 'express';

const router = Router();

router.use(internalUserJwt);

router.patch(
  '/update/:id',
  validate(UpdateUserSchema),
  userController.updateProfile
);

export default router;
