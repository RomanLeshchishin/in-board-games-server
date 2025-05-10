import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiProperty()
  avatar: string;

  @ApiProperty()
  age: number;

  @ApiProperty()
  about: string;

  @ApiProperty()
  birthday: Date;
}
