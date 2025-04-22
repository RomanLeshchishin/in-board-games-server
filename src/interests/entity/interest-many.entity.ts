import { ApiProperty } from '@nestjs/swagger';

export class InterestManyEntity {
  @ApiProperty()
  savedInterests: number;
}
