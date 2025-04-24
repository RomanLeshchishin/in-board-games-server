import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FormTopicsService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.formTopic.findMany();
  }

  delete(userId: string, topicId: string) {
    return this.prismaService.formTopic.delete({ where: { userIdTopicId: { userId, topicId } } });
  }
}
