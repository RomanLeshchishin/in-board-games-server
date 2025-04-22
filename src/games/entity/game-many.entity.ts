import { ApiProperty } from '@nestjs/swagger';

export class GameManyEntity {
  @ApiProperty()
  savedGames: number;
}
