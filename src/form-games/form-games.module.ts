import { Module } from '@nestjs/common';
import { FormGamesService } from './form-games.service';
import { FormGamesController } from './form-games.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FormGamesController],
  providers: [FormGamesService],
})
export class FormGamesModule {}
