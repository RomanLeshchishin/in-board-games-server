import { SetMetadata } from '@nestjs/common';
import { ModelType } from '@prisma/client';

export const ModelTypes = (...modelTypes: ModelType[]) => SetMetadata('modelTypes', modelTypes);
