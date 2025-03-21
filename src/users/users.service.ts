import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entity/user.entity';
import { UserByEmailEntity } from './entity/user-by-email.entity';

export const roundsOfHashing = 10;

@Injectable()
export class UsersService {
  private readonly omitUser = { password: true, createdAt: true, updatedAt: true };

  constructor(private prismaService: PrismaService) {}

  async create(dto: CreateUserDto, role?: Role): Promise<UserEntity> {
    let createdUser;
    const hashedPassword = await bcrypt.hash(dto.password, roundsOfHashing);

    dto.password = hashedPassword;
    if (role) {
      createdUser = await this.prismaService.user.create({ data: { ...dto, role }, omit: this.omitUser });
    } else {
      createdUser = await this.prismaService.user.create({ data: dto, omit: this.omitUser });
    }

    return createdUser;
  }

  findAll(): Promise<UserEntity[]> {
    return this.prismaService.user.findMany({ omit: this.omitUser });
  }

  findByEmail(email: string): Promise<UserByEmailEntity | null> {
    return this.prismaService.user.findUnique({ where: { email }, omit: { createdAt: true, updatedAt: true } });
  }

  findById(id: string): Promise<UserEntity | null> {
    return this.prismaService.user.findUnique({ where: { id }, omit: this.omitUser });
  }

  async update(id: string, dto: Partial<UpdateUserDto>): Promise<UserEntity> {
    return this.prismaService.user.update({ where: { id }, data: dto, omit: this.omitUser });
  }
}
