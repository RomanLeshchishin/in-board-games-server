import { Module } from '@nestjs/common';
import { FormService } from './form.service';
import { FormController } from './form.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { FormModelsModule } from '../form-models/form-models.module';

@Module({
  imports: [PrismaModule, FormModelsModule],
  controllers: [FormController],
  providers: [FormService],
  exports: [FormService],
})
export class FormModule {}
