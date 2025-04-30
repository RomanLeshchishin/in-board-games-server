import { SetMetadata } from '@nestjs/common';
import { FileModelType } from '@prisma/client';

export const ModelTypes = (...modelTypes: FileModelType[]) => SetMetadata('modelTypes', modelTypes);
