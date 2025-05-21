import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TopicsService } from '../topics/topics.service';
import { CommunitiesService } from '../communities/communities.service';
import { CommunityTopicManyDto } from './dto/community-topic-many.dto';

@Injectable()
export class CommunityTopicsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly communitiesService: CommunitiesService,
    private readonly topicsService: TopicsService,
  ) {}

  async create(communityId: string, topicId: string) {
    const communityTopic = await this.prismaService.communityTopics.findUnique({
      where: { communityIdTopicId: { communityId, topicId } },
    });

    if (communityTopic) {
      throw new ConflictException('такая тема уже добавлена в community');
    }

    return this.prismaService.communityTopics.create({ data: { communityId, topicId } });
  }

  async createMany(dto: CommunityTopicManyDto) {
    const community = await this.communitiesService.findById(dto.communityId);
    if (community) {
      const topics = await this.createCommunityTopic(dto.communityId, dto.topicIds);

      return { topics };
    }
    throw new NotFoundException('нет такого сообщества');
  }

  findAll() {
    return this.prismaService.communityTopics.findMany();
  }

  async findByCommunityId(communityId: string): Promise<string[]> {
    const communityTopics = await this.prismaService.communityTopics.findMany({ where: { communityId } });

    if (communityTopics.length !== 0) {
      return await Promise.all(
        communityTopics.map(async communityTopic => {
          const topic = await this.topicsService.findById(communityTopic.topicId);
          if (topic) {
            return topic.title;
          }
          return '';
        }),
      );
    }

    return [];
  }

  delete(communityId: string, topicId: string) {
    return this.prismaService.communityTopics.delete({ where: { communityIdTopicId: { communityId, topicId } } });
  }

  async deleteMany(dto: CommunityTopicManyDto) {
    const topics = await this.deleteCommunityTopic(dto.communityId, dto.topicIds);
    return { topics };
  }

  private async createCommunityTopic(communityId: string, topicIds: string[]): Promise<string[]> {
    if (topicIds.length !== 0) {
      return await Promise.all(
        topicIds.map(async topicId => {
          const topic = await this.topicsService.findById(topicId);
          if (topic) {
            const communityTopic = await this.create(communityId, topicId);
            return communityTopic.id;
          }
          return 'тема не найдена';
        }),
      );
    }
    return [];
  }

  private async deleteCommunityTopic(communityId: string, topicIds: string[]): Promise<string[]> {
    if (topicIds && topicIds.length !== 0) {
      return await Promise.all(
        topicIds.map(async topicId => {
          const topic = await this.topicsService.findById(topicId);
          if (topic) {
            const communityTopic = await this.delete(communityId, topicId);
            return communityTopic.id;
          }
          return 'тема не найдена';
        }),
      );
    }
    return [];
  }
}
