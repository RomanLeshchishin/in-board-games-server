import { Module } from '@nestjs/common';
import { CommunityTopicsService } from './community-topics.service';
import { CommunityTopicsController } from './community-topics.controller';

@Module({
  controllers: [CommunityTopicsController],
  providers: [CommunityTopicsService],
})
export class CommunityTopicsModule {}
