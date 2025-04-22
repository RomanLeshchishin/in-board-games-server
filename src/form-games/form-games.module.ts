import { Module } from '@nestjs/common';
import { FormGamesService } from './form-games.service';
import { FormGamesController } from './form-games.controller';

@Module({
  controllers: [FormGamesController],
  providers: [FormGamesService],
})
export class FormGamesModule {}
