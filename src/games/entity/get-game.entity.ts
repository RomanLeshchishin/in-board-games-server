import { ApiProperty } from '@nestjs/swagger';

export class GetGameEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  topicId: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string | null;

  @ApiProperty()
  numberParticipants: number;

  @ApiProperty()
  age: number;

  @ApiProperty()
  topic: { title: string };
}
