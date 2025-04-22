import { ApiProperty } from '@nestjs/swagger';

export class TopicManyEntity {
  @ApiProperty()
  savedTopics: number;
}
