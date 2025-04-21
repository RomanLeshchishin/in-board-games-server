import { ApiProperty } from '@nestjs/swagger';

export class CreateTopicDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description?: string;
}
