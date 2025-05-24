import { ApiProperty } from '@nestjs/swagger';

export class GameEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  topicId: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string | null;

  @ApiProperty()
  numberParticipants: string;

  @ApiProperty()
  age: number;
}
