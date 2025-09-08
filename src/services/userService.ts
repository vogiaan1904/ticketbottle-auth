import { ErrorCodeEnum } from '@/constants/errors';
import { UpdateUserDto } from '@/dtos/userDto';
import { BusinessException } from '@/exceptions';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

export class UserService {
  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new BusinessException(ErrorCodeEnum.UserNotFound);
    }

    return user;
  }

  async updateProfile(id: string, data: UpdateUserDto) {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new BusinessException(ErrorCodeEnum.UserNotFound);
    }

    return prisma.user.update({
      where: { id },
      data,
    });
  }
}

export const userService = new UserService();
