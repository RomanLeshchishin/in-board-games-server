import { ApiProperty } from '@nestjs/swagger';
import { PeopleGender } from '@prisma/client';

export class CreateFormDto {
  @ApiProperty()
  age: number;

  @ApiProperty()
  gender: PeopleGender;

  @ApiProperty()
  favoriteTime: any[];

  @ApiProperty()
  address?: any;

  @ApiProperty()
  about?: string;

  @ApiProperty()
  institute?: string;

  @ApiProperty()
  course?: number;

  @ApiProperty()
  direction?: string;

  @ApiProperty()
  profession?: string;
}
