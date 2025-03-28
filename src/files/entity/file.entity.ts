import { ModelType } from '@prisma/client';

export class FileEntity {
  id: string;
  modelId: string;
  modelType: ModelType;
  fileName: string;
  fileLink: string;
}
