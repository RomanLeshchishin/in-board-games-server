import { PeopleStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePeopleDto {
  @ApiProperty()
  status: PeopleStatus;
}
