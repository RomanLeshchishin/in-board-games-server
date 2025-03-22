import { Body, Controller, Param, Put } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Put('/:id')
  update(@Param('id') id: string, @Body() updateUserProfileDto: UpdateUserProfileDto) {}
}
