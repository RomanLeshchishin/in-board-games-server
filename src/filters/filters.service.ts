import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FilterByManyDto } from './dto/filter-by-many.dto';
import { FilterFormAdvanced } from './enums/filterFormAdvanced';
import { FilterFormSimple } from './enums/filterFormSimple';

@Injectable()
export class FiltersService {
  constructor(private readonly prismaService: PrismaService) {}

  async filterByMany(filters: FilterByManyDto[]) {
    if (filters.length === 0) return [];

    let forms = await this.prismaService.form.findMany({
      include: { models: { select: { modelId: true } }, profile: { select: { age: true } } },
    });

    filters.forEach(filter => {
      if (filter.modelType in FilterFormAdvanced) {
        forms = forms.filter(form => form.models.some(model => filter.modelId === model.modelId));
      } else {
        forms = this.filterForms(filter.modelId, forms, filter.modelType as FilterFormSimple);
      }
    });

    return forms;
  }

  private filterForms(filter: string, forms: any, filterModelType: FilterFormSimple) {
    switch (filterModelType) {
      case FilterFormSimple.AGE:
        return forms.filter(
          form => form.profile.age <= filter.split('-')[1] && form.profile.age >= filter.split('-')[0],
        );
      case FilterFormSimple.GENDER:
        return forms.filter(form => form.gender === filter);
    }
  }
}
