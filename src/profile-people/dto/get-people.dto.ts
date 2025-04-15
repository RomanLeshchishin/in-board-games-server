import { PeopleStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class GetPeopleDto {
  @ApiProperty()
  status: PeopleStatus;
}
