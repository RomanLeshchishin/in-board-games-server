import { ModelType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class GetFileDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  modelType: ModelType;
}
