import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { UsersService } from '../users/users.service';
import { UserProfileEntity } from './entity/user-profile.entity';
import { GetProfileEntity } from './entity/get-profile.entity';
import { ProfileEntity } from './entity/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    private prismaService: PrismaService,
    private userService: UsersService,
  ) {}

  async create(userId: string): Promise<void> {
    await this.prismaService.profile.create({ data: { userId } });
  }

  async findById(userId: string, profileId: string): Promise<GetProfileEntity> {
    const profile = await this.prismaService.profile.findUnique({ where: { id: profileId } });
    const user = await this.userService.findById(userId);
    if (profile && user) {
      const { id, ...userResponse } = user;
      return { user: userResponse, profile };
    } else {
      throw new NotFoundException('user или profile не найдены');
    }
  }

  async findByUserId(userId: string): Promise<GetProfileEntity> {
    const profile = await this.prismaService.profile.findUnique({ where: { userId } });
    const user = await this.userService.findById(userId);
    if (profile && user) {
      const { id, ...userResponse } = user;
      return { user: userResponse, profile };
    } else {
      throw new NotFoundException('user или profile не найдены');
    }
  }

  findAll(): Promise<ProfileEntity[]> {
    return this.prismaService.profile.findMany({
      include: { user: { select: { firstName: true, lastName: true, email: true, role: true } } },
    });
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
