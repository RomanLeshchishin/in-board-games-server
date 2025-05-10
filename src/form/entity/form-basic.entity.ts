import { PeopleGender } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class FormBasicEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  birthday: Date;

  @ApiProperty()
  gender: PeopleGender;

  @ApiProperty()
  favoriteTime: any[];

  @ApiProperty()
  patronymic: string | null;

  @ApiProperty()
  phoneNumber: bigint | null;

  @ApiProperty()
  address: any | null;

  @ApiProperty()
  institute: string | null;

  @ApiProperty()
  course: number | null;

  @ApiProperty()
  direction: string | null;

  @ApiProperty()
  profession: string | null;

  @ApiProperty()
  blockedAt: Date | null;
}
