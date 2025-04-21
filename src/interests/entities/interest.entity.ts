import { ApiProperty } from '@nestjs/swagger';

export class InterestEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  area: string;
}
