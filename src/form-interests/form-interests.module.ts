import { Module } from '@nestjs/common';
import { FormInterestsService } from './form-interests.service';
import { FormInterestsController } from './form-interests.controller';

@Module({
  controllers: [FormInterestsController],
  providers: [FormInterestsService],
})
export class FormInterestsModule {}
