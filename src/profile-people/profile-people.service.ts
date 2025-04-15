import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddPeopleDto } from './dto/add-people.dto';
import { PeopleStatus } from '@prisma/client';
import { GetPeopleDto } from './dto/get-people.dto';
import { ProfilePeopleEntity } from './entity/profile-people.entity';
import { PeopleParamDto } from './dto/people-param.dto';
import { UpdatePeopleDto } from './dto/update-people.dto';

@Injectable()
export class ProfilePeopleService {
  constructor(private readonly prismaService: PrismaService) {}

  async addPeople(dto: AddPeopleDto, status: PeopleStatus, user: any): Promise<ProfilePeopleEntity> {
    if (user.userId === dto.savedUserId) {
      throw new ConflictException('нельзя добавить себя в profile');
    }

    const profilePeople = await this.prismaService.profilePeople.findUnique({
      where: { userIdSavedUserId: { userId: user.userId, savedUserId: dto.savedUserId } },
    });
    if (!profilePeople) {
      return this.prismaService.profilePeople.create({
        data: { userId: user.userId, savedUserId: dto.savedUserId, status },
      });
    } else {
      throw new ConflictException('пользователь уже добавлен в profile');
    }
  }

  getPeopleByIdAndStatus(dto: GetPeopleDto, userId: string): Promise<ProfilePeopleEntity[]> {
    return this.prismaService.profilePeople.findMany({ where: { userId, status: dto.status } });
  }

  async updatePeople(params: PeopleParamDto, dto: UpdatePeopleDto, user: any): Promise<ProfilePeopleEntity> {
    return this.prismaService.profilePeople.update({
      where: { userIdSavedUserId: { userId: user.userId, savedUserId: params.savedUserId } },
      data: { status: dto.status },
    });
  }

  async deletePeople(params: PeopleParamDto, user: any): Promise<ProfilePeopleEntity> {
    return this.prismaService.profilePeople.delete({
      where: { userIdSavedUserId: { userId: user.userId, savedUserId: params.savedUserId } },
    });
  }
}
