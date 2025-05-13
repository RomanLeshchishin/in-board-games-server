import { FormModelType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class FilterByManyDto {
  @ApiProperty()
  modelId: string;

  @ApiProperty()
  modelType: FormModelType;
}
