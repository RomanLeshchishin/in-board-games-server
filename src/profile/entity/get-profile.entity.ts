import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../users/entity/user.entity';
import { ProfileEntity } from './profile.entity';

export class GetProfileEntity {
  @ApiProperty()
  user: UserEntity | null;

  @ApiProperty()
  profile: ProfileEntity | null;
}
