import { Body, Controller, Post, Get, Query, Param, Put, Delete, UseGuards, Req } from '@nestjs/common';
import { ProfilePeopleService } from './profile-people.service';
import { AddPeopleDto } from './dto/add-people.dto';
import { PeopleStatus } from '@prisma/client';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetPeopleDto } from './dto/get-people.dto';
import { PeopleParamDto } from './dto/people-param.dto';
import { UpdatePeopleDto } from './dto/update-people.dto';
import { AccessTokenGuard } from '../guards/accessToken.guard';
import { ProfilePeopleEntity } from './entity/profile-people.entity';
import { Request } from 'express';
import { User } from '../decorators/user.decorator';

@ApiTags('profile-people')
@UseGuards(AccessTokenGuard)
@Controller('profile-people')
export class ProfilePeopleController {
  constructor(private readonly profilePeopleService: ProfilePeopleService) {}

  @Post('saved')
  @ApiCreatedResponse({ type: ProfilePeopleEntity })
  addSavedPeopleToProfile(@User('userId') userId: string, @Body() addDto: AddPeopleDto) {
    return this.profilePeopleService.addPeople(addDto, PeopleStatus.SAVED, userId);
  }

  @Post('friend')
  @ApiCreatedResponse({ type: ProfilePeopleEntity })
  addFriendsToProfile(@User('userId') userId: string, @Body() addDto: AddPeopleDto) {
    return this.profilePeopleService.addPeople(addDto, PeopleStatus.FRIEND, userId);
  }

  @Get('/:userId/people')
  @ApiOkResponse({ type: ProfilePeopleEntity, isArray: true })
  getById(@Param('userId') userId: string, @Query() getPeopleDto: GetPeopleDto) {
    return this.profilePeopleService.getPeopleByIdAndStatus(getPeopleDto, userId);
  }

  @Put('/:savedUserId')
  @ApiOkResponse({ type: ProfilePeopleEntity })
  update(
    @User('userId') userId: string,
    @Param() updatePeopleParamDto: PeopleParamDto,
    @Body() updatePeopleDto: UpdatePeopleDto,
  ) {
    return this.profilePeopleService.updatePeople(updatePeopleParamDto, updatePeopleDto, userId);
  }

  @Delete('/:savedUserId')
  delete(@User('userId') userId: string, @Param() deletePeopleParamDto: PeopleParamDto) {
    return this.profilePeopleService.deletePeople(deletePeopleParamDto, userId);
  }
}
