import { UserEntity } from '../../users/entity/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class AuthEntity {
  @ApiProperty()
  user: UserEntity;

  @ApiProperty()
  accessToken: string;
}
