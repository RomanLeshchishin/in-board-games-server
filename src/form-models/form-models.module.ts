import { Module } from '@nestjs/common';
import { FormModelsService } from './form-models.service';
import { FormModelsController } from './form-models.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { GamesModule } from '../games/games.module';
import { InterestsModule } from '../interests/interests.module';
import { TopicsModule } from '../topics/topics.module';

@Module({
  imports: [PrismaModule, GamesModule, InterestsModule, TopicsModule],
  controllers: [FormModelsController],
  providers: [FormModelsService],
  exports: [FormModelsService],
})
export class FormModelsModule {}
