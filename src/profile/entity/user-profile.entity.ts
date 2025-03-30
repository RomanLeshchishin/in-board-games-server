import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../users/entity/user.entity';
import { ProfileEntity } from './profile.entity';

export class UserProfileEntity {
  @ApiProperty()
  user: UserEntity; //убрать id и role

  @ApiProperty()
  profile: ProfileEntity; //убрать userId
}
