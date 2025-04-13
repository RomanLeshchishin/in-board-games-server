import { ModelType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class GetAuthFilesDto {
  @ApiProperty()
  modelId: string;

  @ApiProperty()
  modelType?: ModelType;
}
