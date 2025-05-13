import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FormBasicEntity } from './entity/form-basic.entity';
import { UpdateFreezeAtDto } from './dto/update-freeze-at.dto';
import { UpdateBlockedAtDto } from './dto/update-blocked-at.dto';
import { FormModelsService } from '../form-models/form-models.service';
import { FormModelType } from '@prisma/client';
import { FormAdvancedEntity } from './entity/form-advanced.entity';
import { CreateFormDto } from './dto/create-form.dto';

@Injectable()
export class FormService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly formModelsService: FormModelsService,
  ) {}

  async create(dto: CreateFormDto, userId: string): Promise<FormBasicEntity> {
    const form = await this.prismaService.form.findUnique({ where: { userId } });

    if (form) {
      throw new ConflictException('у пользователя может быть только одна форма');
    }

    return this.prismaService.form.create({ data: { userId, ...dto } });
  }

  findAll(): Promise<FormBasicEntity[]> {
    return this.prismaService.form.findMany();
  }

  findAllNoFreezeAndBlocked(): Promise<FormBasicEntity[]> {
    return this.prismaService.form.findMany({ where: { freezeAt: null, blockedAt: null } });
  }

  async findById(userId: string): Promise<FormAdvancedEntity> {
    const form = await this.prismaService.form.findUnique({ where: { userId } });
    const interests = await this.formModelsService.findByUserId(userId, FormModelType.INTEREST);
    const topics = await this.formModelsService.findByUserId(userId, FormModelType.TOPIC);
    const games = await this.formModelsService.findByUserId(userId, FormModelType.GAME);

    if (form) {
      return {
        ...form,
        interests,
        topics,
        games,
      };
    }

    throw new NotFoundException('форма не найдена');
  }

  async findFormInterestsById(userId: string) {
    const form = await this.prismaService.form.findUnique({ where: { userId } });
    const interests = await this.formModelsService.findByUserId(userId, FormModelType.INTEREST);

    if (form) {
      return { interests };
    }

    throw new NotFoundException('форма с интересами не найдена');
  }

  update(dto: Partial<CreateFormDto>, userId: string): Promise<FormBasicEntity> {
    return this.prismaService.form.update({ where: { userId }, data: dto });
  }

  updateFreezeAt(dto: UpdateFreezeAtDto, userId: string): Promise<FormBasicEntity> {
    return this.prismaService.form.update({ where: { userId }, data: dto });
  }

  updateBlockedAt(dto: UpdateBlockedAtDto, userId: string): Promise<FormBasicEntity> {
    return this.prismaService.form.update({ where: { userId }, data: dto });
  }

  delete(userId: string) {
    return this.prismaService.form.delete({ where: { userId } });
  }
}
