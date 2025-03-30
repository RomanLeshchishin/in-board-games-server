import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { AccessTokenGuard } from '../guards/accessToken.guard';
import { ApiOkResponse } from '@nestjs/swagger';
import { UserProfileEntity } from './entity/user-profile.entity';
import { GetProfileEntity } from './entity/get-profile.entity';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profilesService: ProfileService) {}

  @Get('/:id')
  @ApiOkResponse({ type: UserProfileEntity })
  getById(@Param('id') id: string) {
    return this.profilesService.findById(id);
  }

  @Put('/:id')
  @UseGuards(AccessTokenGuard)
  @ApiOkResponse({ type: GetProfileEntity })
  update(@Param('id') id: string, @Body() updateUserProfileDto: UpdateUserProfileDto) {
    return this.profilesService.update(id, updateUserProfileDto);
  }

  //getAllProfiles user: убрать id и role, profile: убрать userId
}
