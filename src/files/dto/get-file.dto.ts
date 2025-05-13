import { FileModelType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class GetFileDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  modelType: FileModelType;
}
