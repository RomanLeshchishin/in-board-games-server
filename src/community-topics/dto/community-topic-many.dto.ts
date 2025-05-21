import { ApiProperty } from '@nestjs/swagger';

export class CommunityTopicManyDto {
  @ApiProperty()
  communityId: string;

  @ApiProperty()
  topicIds: string[];
}
