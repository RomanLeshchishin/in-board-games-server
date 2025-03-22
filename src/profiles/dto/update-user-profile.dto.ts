import { UpdateUserDto } from '../../users/dto/update-user.dto';
import { UpdateProfileDto } from './update-profile.dto';

export class UpdateUserProfileDto {
  user: UpdateUserDto;
  profile: UpdateProfileDto;
}
