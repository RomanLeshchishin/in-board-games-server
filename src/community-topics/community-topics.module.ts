import { Module } from '@nestjs/common';
import { CommunityTopicsService } from './community-topics.service';
import { CommunityTopicsController } from './community-topics.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { TopicsModule } from '../topics/topics.module';
import { CommunitiesModule } from '../communities/communities.module';

@Module({
  imports: [PrismaModule, CommunitiesModule, TopicsModule],
  controllers: [CommunityTopicsController],
  providers: [CommunityTopicsService],
})
export class CommunityTopicsModule {}
