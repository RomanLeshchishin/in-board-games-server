import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [GamesController],
  providers: [GamesService],
  exports: [GamesService],
})
export class GamesModule {}
