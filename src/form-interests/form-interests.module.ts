import { Module } from '@nestjs/common';
import { FormInterestsService } from './form-interests.service';
import { FormInterestsController } from './form-interests.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FormInterestsController],
  providers: [FormInterestsService],
})
export class FormInterestsModule {}
