import { ApiProperty } from '@nestjs/swagger';

export class ProfileEntity {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  avatar: string | null;

  @ApiProperty()
  age: number | null;

  @ApiProperty()
  about: string | null;
}
