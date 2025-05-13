import { FileModelType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class GetFilesDto {
  @ApiProperty()
  modelId: string;

  @ApiProperty()
  modelType: FileModelType;
}
