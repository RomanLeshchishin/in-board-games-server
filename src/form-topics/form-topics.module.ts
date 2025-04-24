import { Module } from '@nestjs/common';
import { FormTopicsService } from './form-topics.service';
import { FormTopicsController } from './form-topics.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FormTopicsController],
  providers: [FormTopicsService],
})
export class FormTopicsModule {}
