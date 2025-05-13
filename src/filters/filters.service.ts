import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FormModelType } from '@prisma/client';
import { FilterByManyDto } from './dto/filter-by-many.dto';

@Injectable()
export class FiltersService {
  constructor(private readonly prismaService: PrismaService) {}

  filterByOne(modelId: string, modelType: FormModelType) {
    return this.prismaService.form.findMany({ where: { models: { some: { modelId, modelType } } } });
  }

  async filterByMany(filters: FilterByManyDto[]) {
    if (filters.length === 0) return [];

    const forms = await this.prismaService.form.findMany({
      where: {
        models: {
          every: {
            AND: filters.map(f => ({
              modelId: f.modelId,
              modelType: f.modelType,
            })),
          },
        },
      },
      include: {
        models: true,
      },
    });

    return forms;
  }
}
