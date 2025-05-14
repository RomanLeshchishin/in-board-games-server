import { SetMetadata } from '@nestjs/common';
import { FileModelType } from '@prisma/client';

export const FileModelTypes = (...fileModelTypes: FileModelType[]) => SetMetadata('fileModelTypes', fileModelTypes);
