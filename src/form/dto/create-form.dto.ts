import { ApiProperty } from '@nestjs/swagger';
import { HowOften, PeopleGender, WhatDays } from '@prisma/client';

export class CreateFormDto {
  @ApiProperty()
  profileId: string;

  @ApiProperty()
  birthday: Date;

  @ApiProperty()
  gender: PeopleGender;

  @ApiProperty()
  whatDays: WhatDays;

  @ApiProperty()
  howOften: HowOften;

  @ApiProperty()
  favoriteTime: any[];

  @ApiProperty()
  patronymic?: string;

  @ApiProperty()
  phoneNumber?: string;

  @ApiProperty()
  address?: any;

  @ApiProperty()
  institute?: string;

  @ApiProperty()
  course?: number;

  @ApiProperty()
  direction?: string;

  @ApiProperty()
  profession?: string;
}
