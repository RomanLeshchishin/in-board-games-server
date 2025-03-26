import { UpdateUserDto } from '../../users/dto/update-user.dto';
import { UpdateProfileDto } from './update-profile.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserProfileDto {
  @ApiProperty()
  user: Partial<UpdateUserDto>;

  @ApiProperty()
  profile: Partial<UpdateProfileDto>;
}
