import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FormModelType } from '@prisma/client';
import { FormModelDto } from './dto/form-model.dto';
import { InterestsService } from '../interests/interests.service';
import { TopicsService } from '../topics/topics.service';
import { GamesService } from '../games/games.service';
import { FormModelManyDto } from './dto/form-model-many.dto';
import { FormModelManyEntity } from './entity/form-model-many.entity';
import { FormModelEntity } from './entity/form-model.entity';

@Injectable()
export class FormModelsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly interestsService: InterestsService,
    private readonly topicsService: TopicsService,
    private readonly gamesService: GamesService,
  ) {}

  async create(userId: string, dto: FormModelDto): Promise<FormModelEntity> {
    const formModel = await this.prismaService.formModel.findUnique({
      where: { userIdModelIdType: { userId, ...dto } },
    });

    if (formModel) {
      throw new ConflictException('такая модель уже добавлена в form');
    }

    return this.prismaService.formModel.create({ data: { userId, ...dto } });
  }

  async createMany(userId: string, dto: FormModelManyDto): Promise<FormModelManyEntity> {
    const form = await this.prismaService.form.findUnique({ where: { userId } });
    if (form) {
      const interests = await this.createFormModel(dto.interestIds, FormModelType.INTEREST, userId);
      const topics = await this.createFormModel(dto.topicIds, FormModelType.TOPIC, userId);
      const games = await this.createFormModel(dto.gameIds, FormModelType.GAME, userId);

      return { interests, topics, games };
    }
    throw new NotFoundException('у этого пользователя нет формы');
  }

  findAll() {
    return this.prismaService.formModel.findMany();
  }

  async findByUserId(userId: string, modelType: FormModelType): Promise<string[]> {
    const formModels = await this.prismaService.formModel.findMany({ where: { userId, modelType } });

    if (formModels.length !== 0) {
      switch (modelType) {
        case FormModelType.COMMUNITY:
          return [];
        case FormModelType.GAME:
          return await Promise.all(
            formModels.map(async model => {
              const game = await this.gamesService.findById(model.modelId);
              if (game) {
                return game.title;
              }

              return 'not found';
            }),
          );
        case FormModelType.INTEREST:
          return await Promise.all(
            formModels.map(async model => {
              const interest = await this.interestsService.findById(model.modelId);
              if (interest) {
                return interest.title;
              }

              return 'not found';
            }),
          );
        case FormModelType.TOPIC:
          return await Promise.all(
            formModels.map(async model => {
              const topic = await this.topicsService.findById(model.modelId);
              if (topic) {
                return topic.title;
              }

              return 'not found';
            }),
          );
      }
    }

    return [];
  }

  findByModelIdType(modelId: string, modelType: FormModelType) {
    switch (modelType) {
      case FormModelType.COMMUNITY:
        return [];
      case FormModelType.GAME:
        return this.gamesService.findById(modelId);
      case FormModelType.INTEREST:
        return this.interestsService.findById(modelId);
      case FormModelType.TOPIC:
        return this.topicsService.findById(modelId);
    }
  }

  delete(userId: string, params: FormModelDto): Promise<FormModelEntity> {
    return this.prismaService.formModel.delete({ where: { userIdModelIdType: { userId, ...params } } });
  }

  async deleteMany(userId: string, dto: FormModelManyDto): Promise<FormModelManyEntity> {
    const interests = await this.deleteFormModel(dto.interestIds, FormModelType.INTEREST, userId);
    const topics = await this.deleteFormModel(dto.topicIds, FormModelType.TOPIC, userId);
    const games = await this.deleteFormModel(dto.gameIds, FormModelType.GAME, userId);

    return { interests, topics, games };
  }

  private async createFormModel(
    modelIds: string[] | null,
    modelType: FormModelType,
    userId: string,
  ): Promise<string[]> {
    if (modelIds && modelIds.length !== 0) {
      return await Promise.all(
        modelIds.map(async modelId => {
          const model = await this.findByModelIdType(modelId, modelType);
          if (model) {
            const formModel = await this.create(userId, {
              modelId,
              modelType,
            });
            return formModel.id;
          }
          return 'модель не найдена';
        }),
      );
    }
    return [];
  }

  private async deleteFormModel(
    modelIds: string[] | null,
    modelType: FormModelType,
    userId: string,
  ): Promise<string[]> {
    if (modelIds && modelIds.length !== 0) {
      return await Promise.all(
        modelIds.map(async modelId => {
          const model = await this.findByModelIdType(modelId, modelType);
          if (model) {
            const formModel = await this.delete(userId, {
              modelId,
              modelType,
            });
            return formModel.id;
          }
          return 'модель не найдена';
        }),
      );
    }
    return [];
  }
}
