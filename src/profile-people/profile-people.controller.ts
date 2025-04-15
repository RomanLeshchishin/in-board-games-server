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

@ApiTags('profile-people')
@UseGuards(AccessTokenGuard)
@Controller('profile-people')
export class ProfilePeopleController {
  constructor(private readonly profilePeopleService: ProfilePeopleService) {}

  @Post('saved')
  @ApiCreatedResponse({ type: ProfilePeopleEntity })
  addSavedPeopleToProfile(@Body() addDto: AddPeopleDto, @Req() req: Request) {
    const user = req.user;
    return this.profilePeopleService.addPeople(addDto, PeopleStatus.SAVED, user);
  }

  @Post('friend')
  @ApiCreatedResponse({ type: ProfilePeopleEntity })
  addFriendsToProfile(@Body() addDto: AddPeopleDto, @Req() req: Request) {
    const user = req.user;
    return this.profilePeopleService.addPeople(addDto, PeopleStatus.FRIEND, user);
  }

  @Get('/:userId/people')
  @ApiOkResponse({ type: ProfilePeopleEntity, isArray: true })
  getById(@Param('userId') userId: string, @Query() getPeopleDto: GetPeopleDto) {
    return this.profilePeopleService.getPeopleByIdAndStatus(getPeopleDto, userId);
  }

  @Put('/:savedUserId')
  @ApiOkResponse({ type: ProfilePeopleEntity })
  update(@Param() updatePeopleParamDto: PeopleParamDto, @Body() updatePeopleDto: UpdatePeopleDto, @Req() req: Request) {
    const user = req.user;
    return this.profilePeopleService.updatePeople(updatePeopleParamDto, updatePeopleDto, user);
  }

  @Delete('/:savedUserId')
  delete(@Param() deletePeopleParamDto: PeopleParamDto, @Req() req: Request) {
    const user = req.user;
    return this.profilePeopleService.deletePeople(deletePeopleParamDto, user);
  }
}
