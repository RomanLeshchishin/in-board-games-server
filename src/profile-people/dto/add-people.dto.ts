import { ApiProperty } from '@nestjs/swagger';

export class AddPeopleDto {
  @ApiProperty()
  savedUserId: string;
}
