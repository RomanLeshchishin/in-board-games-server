import { PeopleStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ProfilePeopleEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  savedUserId: string;

  @ApiProperty()
  status: PeopleStatus;
}
