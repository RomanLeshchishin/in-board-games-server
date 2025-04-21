import { ApiProperty } from '@nestjs/swagger';

export class TopicEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string | null;
}
