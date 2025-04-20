import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFormDto } from './dto/create-form.dto';
import { FormEntity } from './entity/form.entity';
import { UpdateFreezeAtDto } from './dto/update-freeze-at.dto';
import { UpdateBlockedAtDto } from './dto/update-blocked-at.dto';

@Injectable()
export class FormService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateFormDto, userId: string): Promise<FormEntity> {
    const form = await this.prismaService.form.findUnique({ where: { userId } });

    if (form) {
      throw new ConflictException('у пользователя может быть только одна форма');
    }

    return this.prismaService.form.create({ data: { userId, ...dto } });
  }

  findAll(): Promise<FormEntity[]> {
    return this.prismaService.form.findMany();
  }

  findAllNoFreezeAndBlocked(): Promise<FormEntity[]> {
    return this.prismaService.form.findMany({ where: { freezeAt: null, blockedAt: null } });
  }

  findById(userId: string): Promise<FormEntity | null> {
    return this.prismaService.form.findUnique({ where: { userId } });
  }

  update(dto: Partial<CreateFormDto>, userId: string): Promise<FormEntity> {
    return this.prismaService.form.update({ where: { userId }, data: dto });
  }

  updateFreezeAt(dto: UpdateFreezeAtDto, userId: string): Promise<FormEntity> {
    return this.prismaService.form.update({ where: { userId }, data: dto });
  }

  updateBlockedAt(dto: UpdateBlockedAtDto, userId: string): Promise<FormEntity> {
    return this.prismaService.form.update({ where: { userId }, data: dto });
  }

  delete(userId: string) {
    return this.prismaService.form.delete({ where: { userId } });
  }
}
