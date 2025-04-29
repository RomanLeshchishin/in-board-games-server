import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommunitiesService {
  constructor(private readonly prismaService: PrismaService) {}

  create(dto) {
    return this.prismaService.community.create({ data: dto });
  }

  findAll() {
    return this.prismaService.community.findMany();
  }

  findAllNoBlocked() {
    return this.prismaService.community.findMany({ where: { blockedAt: null } });
  }
}
