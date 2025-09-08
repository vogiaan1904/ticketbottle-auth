import { UpdateUserDto } from '@/dtos/user.dto';
import { userService } from '@/services/user.service.js';
import catchAsync from '@/utils/catchAsync.js';
import { sendResponse } from '@/utils/response.js';
import { Request, Response } from 'express';

export class UserController {
  updateProfile = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
      const id = req.params.id as string;
      const updatedUser = await userService.updateProfile(id, req.body);
      sendResponse.success(res, updatedUser);
    }
  );
}

export const userController = new UserController();
