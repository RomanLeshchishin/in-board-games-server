import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FormModelType } from '@prisma/client';

@Injectable()
export class FormModelsService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.formModel.findMany();
  }

  delete(userId: string, modelId: string, modelType: FormModelType) {
    return this.prismaService.formModel.delete({ where: { userIdModelIdType: { userId, modelId, modelType } } });
  }
}
