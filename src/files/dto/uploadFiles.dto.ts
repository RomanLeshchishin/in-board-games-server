import { ModelType } from '@prisma/client';

export class UploadFilesDto {
  modelId: string;
  modelType: ModelType;
}
