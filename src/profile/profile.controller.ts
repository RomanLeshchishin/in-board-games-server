import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { AccessTokenGuard } from '../guards/accessToken.guard';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserProfileEntity } from './entity/user-profile.entity';
import { GetProfileEntity } from './entity/get-profile.entity';
import { ProfileEntity } from './entity/profile.entity';

@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('id/:id')
  @ApiOkResponse({ type: UserProfileEntity })
  getByUserId(@Param('id') id: string) {
    return this.profileService.findById(id);
  }

  getById() {}

  @Get('all')
  @ApiOkResponse({ type: ProfileEntity, isArray: true })
  getAll() {
    return this.profileService.findAll();
  }

  @Put('/:id')
  @UseGuards(AccessTokenGuard)
  @ApiOkResponse({ type: GetProfileEntity })
  update(@Param('id') id: string, @Body() updateUserProfileDto: UpdateUserProfileDto) {
    return this.profileService.update(id, updateUserProfileDto);
  }
}
