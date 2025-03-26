import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { UsersService } from '../users/users.service';
import { UserProfileEntity } from './entity/user-profile.entity';
import { GetProfileEntity } from './entity/get-profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    private prismaService: PrismaService,
    private userService: UsersService,
  ) {}

  async create(userId: string): Promise<void> {
    await this.prismaService.profile.create({ data: { userId } });
  }

  async findById(userId: string): Promise<GetProfileEntity> {
    const updatedProfile = await this.prismaService.profile.findUnique({ where: { userId } });
    const updatedUser = await this.userService.findById(userId);
    return { user: updatedUser, profile: updatedProfile };
  }

  async update(userId: string, dto: Partial<UpdateUserProfileDto>): Promise<UserProfileEntity> {
    let updatedUser;
    if (dto.user) {
      updatedUser = await this.userService.update(userId, dto.user);
    }

    let updatedProfile;
    if (dto.profile) {
      updatedProfile = await this.prismaService.profile.update({ where: { userId }, data: dto.profile });
    }

    return { user: updatedUser, profile: updatedProfile };
  }
}
