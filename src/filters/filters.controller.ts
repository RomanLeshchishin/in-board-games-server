import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { FiltersService } from './filters.service';
import { FilterByManyDto } from './dto/filter-by-many.dto';
import { AccessTokenGuard } from '../guards/accessToken.guard';
import { FormModelTypeGuard } from '../guards/formModelType.guard';
import { FormModelTypes } from '../decorators/formModelTypes.decorator';
import { FilterFormModelType } from './enums/filterFormModelType';

@Controller('filters')
export class FiltersController {
  constructor(private readonly filtersService: FiltersService) {}

  @Post('/many')
  @UseGuards(FormModelTypeGuard)
  @FormModelTypes(FilterFormModelType.AGE, FilterFormModelType.GENDER, FilterFormModelType.INTEREST)
  filterByMany(@Body() filters: FilterByManyDto[]) {
    return this.filtersService.filterByMany(filters);
  }

  @Post('/many-auth')
  @UseGuards(AccessTokenGuard)
  filterByManyAuth(@Body() filters: FilterByManyDto[]) {
    return this.filtersService.filterByMany(filters);
  }
}
