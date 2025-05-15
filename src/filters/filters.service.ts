import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FilterByManyDto } from './dto/filter-by-many.dto';
import { FilterFormAdvanced } from './enums/filterFormAdvanced';
import { FilterFormSimple } from './enums/filterFormSimple';
import { ProfileService } from '../profile/profile.service';
import { GetProfileEntity } from '../profile/entity/get-profile.entity';

@Injectable()
export class FiltersService {
  constructor(private readonly prismaService: PrismaService, private readonly profileService: ProfileService) {}

  async filterByMany(filters: FilterByManyDto[]): Promise<GetProfileEntity[]> {
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

    return await Promise.all(
      forms.map(async form => {
        return await this.profileService.findById(form.userId, form.profileId);
      }),
    );
  }

  private filterForms(filter: string, forms: any, filterModelType: FilterFormSimple) {
    switch (filterModelType) {
      case FilterFormSimple.AGE:
        return forms.filter(
          form => form.profile.age <= Number(filter.split('-')[1]) && form.profile.age >= Number(filter.split('-')[0]),
        );
      case FilterFormSimple.GENDER:
        return forms.filter(form => form.gender === filter);
    }
  }
}
