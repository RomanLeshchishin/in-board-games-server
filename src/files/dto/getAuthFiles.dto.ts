import { ModelType } from '@prisma/client';

export class GetAuthFilesDto {
  modelId: string;
  modelType?: ModelType;
}
