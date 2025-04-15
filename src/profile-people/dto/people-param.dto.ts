import { ApiProperty } from '@nestjs/swagger';

export class PeopleParamDto {
  @ApiProperty()
  savedUserId: string;
}
