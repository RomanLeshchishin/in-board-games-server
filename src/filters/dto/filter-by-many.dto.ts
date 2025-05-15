import { ApiProperty } from '@nestjs/swagger';
import { FilterFormModelType } from '../enums/filterFormModelType';

export class FilterByManyDto {
  @ApiProperty()
  modelId: string;

  @ApiProperty()
  modelType: FilterFormModelType;
}
