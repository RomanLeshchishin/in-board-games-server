import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddPeopleToProfileDto } from './dto/addPeopleToProfile.dto';
import { PeopleStatus } from '@prisma/client';

@Injectable()
export class ProfilePeopleService {
  constructor(private readonly prismaService: PrismaService) {}

  addPeopleToProfile(dto: AddPeopleToProfileDto, status: PeopleStatus) {
    const profilePeople = this.prismaService.profilePeople.findUnique({ where: dto });
    if (!profilePeople) {
      return this.prismaService.profilePeople.create({
        data: { profileId: dto.profileId, savedProfileId: dto.savedProfileId, status },
      });
    } else {
      throw new ConflictException('пользователь уже добавлен в profile');
    }
  }
}
