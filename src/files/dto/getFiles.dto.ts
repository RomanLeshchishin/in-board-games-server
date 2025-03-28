import { ModelType } from '@prisma/client';

export class GetFilesDto {
  modelId: string;
  modelType?: ModelType;
}
