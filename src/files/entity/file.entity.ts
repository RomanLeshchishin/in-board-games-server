import { ModelType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class FileEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  modelId: string;

  @ApiProperty()
  modelType: ModelType;

  @ApiProperty()
  fileName: string;

  @ApiProperty()
  fileLink: string;
}
