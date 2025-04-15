import { ApiProperty } from '@nestjs/swagger';

export class ProfileEntity {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  avatar: string | null;

  @ApiProperty()
  phoneNumber: bigint | null;

  @ApiProperty()
  patronymic: string | null;

  @ApiProperty()
  birthday: Date | null;
}
