import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MFile } from '../files/MFile.class';
import { CreateGameDto } from './dto/create-game.dto';
import { GameEntity } from './entity/game.entity';
import { GameManyEntity } from './entity/game-many.entity';
import { GetGameEntity } from './entity/get-game.entity';

@Injectable()
export class GamesService {
  constructor(private prismaService: PrismaService) {}

  create(createGameDto: CreateGameDto): Promise<GameEntity> {
    return this.prismaService.game.create({ data: createGameDto });
  }

  async createMany(file: MFile): Promise<GameManyEntity> {
    const lines = file.buffer.toString().split('\n');
    let savedGames = 0;

    for (const line of lines) {
      if (!line.trim()) continue; // Пропускаем пустые строки

      try {
        const [topicId, title, description, numberParticipants, age] = line.split(';').map(f => f.trim());
        await this.prismaService.game.create({
          data: { topicId, title, description, numberParticipants: parseInt(numberParticipants), age: parseInt(age) },
        });
        savedGames++;
      } catch (error) {
        console.error(`Error processing line: ${line}`, error);
      }
    }

    return { savedGames };
  }

  findAll(): Promise<GetGameEntity[]> {
    return this.prismaService.game.findMany({ include: { topic: { select: { title: true } } } });
  }

  findById(id: string): Promise<GetGameEntity | null> {
    return this.prismaService.game.findUnique({ where: { id }, include: { topic: { select: { title: true } } } });
  }

  update(id: string, updateGameDto: Partial<CreateGameDto>): Promise<GameEntity> {
    return this.prismaService.game.update({ where: { id }, data: updateGameDto });
  }

  delete(id: string): Promise<GameEntity> {
    return this.prismaService.game.delete({ where: { id } });
  }
}
