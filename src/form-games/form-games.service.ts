import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FormGamesService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.formGame.findMany();
  }

  delete(userId: string, gameId: string) {
    return this.prismaService.formGame.delete({ where: { userIdGameId: { userId, gameId } } });
  }
}
