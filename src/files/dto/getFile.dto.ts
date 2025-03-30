import { ModelType } from '@prisma/client';

export class GetFileDto {
  id: string;
  modelType: ModelType;
}
