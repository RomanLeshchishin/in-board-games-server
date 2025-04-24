import { Module } from '@nestjs/common';
import { FormModelsService } from './form-models.service';
import { FormModelsController } from './form-models.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FormModelsController],
  providers: [FormModelsService],
})
export class FormModelsModule {}
