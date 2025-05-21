import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommunitiesService {
  constructor(private readonly prismaService: PrismaService) {}

  create(dto) {
    return this.prismaService.community.create({ data: dto });
  }

  findById(id: string) {
    return this.prismaService.community.findUnique({ where: { id, blockedAt: null }})
  }

  findAll() {
    return this.prismaService.community.findMany();
  }

  findAllNoBlocked() {
    return this.prismaService.community.findMany({ where: { blockedAt: null } });
  }
}
