import { ErrorCodeEnum } from '@/constants/errors';
import { UpdateUserDto } from '@/dtos/userDto';
import { BusinessException } from '@/exceptions';
import { userService } from '@/services/userService.js';
import catchAsync from '@/utils/catchAsync.js';
import { sendResponse } from '@/utils/response.js';
import { Request, Response } from 'express';

export class UserController {
  updateProfile = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
      const id = req.params.id as string;
      if (!id) {
        throw new BusinessException(ErrorCodeEnum.ValidationError);
      }

      const dto: UpdateUserDto = {
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        country: req.body.country,
      };

      const updatedUser = await userService.updateProfile(id, dto);
      sendResponse.success(res, updatedUser);
    }
  );
}

export const userController = new UserController();
