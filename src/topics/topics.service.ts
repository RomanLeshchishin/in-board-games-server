import { Injectable } from '@nestjs/common';
import { CreateTopicDto } from './dto/create-topic.dto';
import { PrismaService } from '../prisma/prisma.service';
import { MFile } from '../files/MFile.class';
import { TopicEntity } from './entities/topic.entity';
import { TopicManyEntity } from './entities/topic-many.entity';

@Injectable()
export class TopicsService {
  constructor(private prismaService: PrismaService) {}

  create(createTopicDto: CreateTopicDto): Promise<TopicEntity> {
    return this.prismaService.topic.create({ data: createTopicDto });
  }

  async createMany(file: MFile): Promise<TopicManyEntity> {
    const lines = file.buffer.toString().split('\n');
    let savedTopics = 0;

    for (const line of lines) {
      if (!line.trim()) continue; // Пропускаем пустые строки

      try {
        const [title, description] = line.split(';').map(f => f.trim());
        await this.prismaService.topic.create({ data: { title, description } });
        savedTopics++;
      } catch (error) {
        console.error(`Error processing line: ${line}`, error);
      }
    }

    return { savedTopics };
  }

  findAll(): Promise<TopicEntity[]> {
    return this.prismaService.topic.findMany();
  }

  findById(id: string): Promise<TopicEntity | null> {
    return this.prismaService.topic.findUnique({ where: { id } });
  }

  update(id: string, updateTopicDto: Partial<CreateTopicDto>): Promise<TopicEntity> {
    return this.prismaService.topic.update({ where: { id }, data: updateTopicDto });
  }

  delete(id: string): Promise<TopicEntity> {
    return this.prismaService.topic.delete({ where: { id } });
  }
}
