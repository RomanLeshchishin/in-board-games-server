import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiProperty()
  phoneNumber: bigint;

  @ApiProperty()
  avatar: string;
}
