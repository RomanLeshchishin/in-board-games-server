import { ModelType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UploadFilesDto {
  @ApiProperty()
  modelId: string;

  @ApiProperty()
  modelType: ModelType;
}
