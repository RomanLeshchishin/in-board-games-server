import { ApiProperty } from '@nestjs/swagger';

export class CreateGameDto {
  @ApiProperty()
  topicId: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  numberParticipants: string;

  @ApiProperty()
  age: number;
}
