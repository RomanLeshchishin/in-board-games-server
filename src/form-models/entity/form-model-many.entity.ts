import { ApiProperty } from '@nestjs/swagger';

export class FormModelManyEntity {
  @ApiProperty()
  interests: string[];

  @ApiProperty()
  topics: string[];

  @ApiProperty()
  games: string[];
}
