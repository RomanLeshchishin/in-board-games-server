import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiProperty()
  avatar: string;

  @ApiProperty()
  phoneNumber: bigint;

  @ApiProperty()
  patronymic: string;

  @ApiProperty()
  birthday: Date;
}
