import { ApiProperty } from '@nestjs/swagger';

export class ProfileEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  avatar?: string;

  @ApiProperty()
  phoneNumber?: bigint;

  @ApiProperty()
  patronymic?: string;

  @ApiProperty()
  birthday?: Date;
}
