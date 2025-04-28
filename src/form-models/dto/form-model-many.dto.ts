import { ApiProperty } from '@nestjs/swagger';

export class FormModelManyDto {
  @ApiProperty()
  interestIds: string[] | null;

  @ApiProperty()
  topicIds: string[] | null;

  @ApiProperty()
  gameIds: string[] | null;
}
