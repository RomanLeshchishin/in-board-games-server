import { Body, Controller, Post } from '@nestjs/common';
import { ProfilePeopleService } from './profile-people.service';
import { AddPeopleToProfileDto } from './dto/addPeopleToProfile.dto';
import { PeopleStatus } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('profile-people')
@Controller('profile-people')
export class ProfilePeopleController {
  constructor(private readonly profilePeopleService: ProfilePeopleService) {}

  @Post('saved')
  addSavedPeopleToProfile(@Body() addDto: AddPeopleToProfileDto) {
    return this.profilePeopleService.addPeopleToProfile(addDto, PeopleStatus.SAVED);
  }

  @Post('friend')
  addFriendsToProfile(@Body() addDto: AddPeopleToProfileDto) {
    return this.profilePeopleService.addPeopleToProfile(addDto, PeopleStatus.FRIEND);
  }

  getAll() {}

  getBy() {}

  update() {}

  delete() {}
}
