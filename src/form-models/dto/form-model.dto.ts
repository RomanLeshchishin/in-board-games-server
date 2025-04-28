import { ApiProperty } from '@nestjs/swagger';
import { FormModelType } from '@prisma/client';

export class FormModelDto {
  @ApiProperty()
  modelId: string;

  @ApiProperty()
  modelType: FormModelType;
}
