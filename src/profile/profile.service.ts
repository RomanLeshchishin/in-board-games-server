import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { UsersService } from '../users/users.service';
import { UserProfileEntity } from './entity/user-profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    private prismaService: PrismaService,
    private userService: UsersService,
  ) {}

  async create(userId: string): Promise<void> {
    await this.prismaService.profile.create({ data: { userId } });
  }

  async update(id: string, dto: Partial<UpdateUserProfileDto>): Promise<UserProfileEntity> {
    let updatedUser;
    if (dto.user) {
      updatedUser = await this.userService.update(id, dto.user);
    }

    let updatedProfile;
    if (dto.profile) {
      updatedProfile = await this.prismaService.profile.update({ where: { id }, data: dto.profile });
    }

    return { user: updatedUser, profile: updatedProfile };
  }

  findById(id: string) {
    return this.prismaService.profile.findUnique({ where: { id }, include: { user: true } });
  }
}
