import { ApiProperty } from '@nestjs/swagger';
import { ProfileEntity } from './profile.entity';
import { UserEntity } from '../../users/entity/user.entity';

export class GetProfileEntity {
  @ApiProperty()
  user: Omit<UserEntity, 'id'> | null;

  @ApiProperty()
  profile: (ProfileEntity & { id: string }) | null;
}
