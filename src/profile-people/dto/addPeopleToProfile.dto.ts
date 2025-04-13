import { ApiProperty } from '@nestjs/swagger';

export class AddPeopleToProfileDto {
  @ApiProperty()
  profileId: string;

  @ApiProperty()
  savedProfileId: string;
}
