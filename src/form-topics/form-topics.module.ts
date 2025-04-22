import { Module } from '@nestjs/common';
import { FormTopicsService } from './form-topics.service';
import { FormTopicsController } from './form-topics.controller';

@Module({
  controllers: [FormTopicsController],
  providers: [FormTopicsService],
})
export class FormTopicsModule {}
