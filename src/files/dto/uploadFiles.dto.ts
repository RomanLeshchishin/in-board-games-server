import { ModelType } from '@prisma/client';

export class UploadFilesDto {
  ownerId: string;
  modelType: ModelType;
}
