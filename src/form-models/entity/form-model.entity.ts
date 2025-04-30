import { FormModelType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class FormModelEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  modelId: string;

  @ApiProperty()
  modelType: FormModelType;
}
