import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class UserByEmailEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  role: Role;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  password: string;
}
