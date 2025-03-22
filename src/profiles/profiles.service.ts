import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProfilesService {
  constructor(private prismaService: PrismaService) {}

  async create() {}

  async update() {}
}
