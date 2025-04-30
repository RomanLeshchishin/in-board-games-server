import { Body, Controller, Post, Get, Query, Param, Put, Delete, UseGuards, NotFoundException } from '@nestjs/common';
import { ProfilePeopleService } from './profile-people.service';
import { AddPeopleDto } from './dto/add-people.dto';
import { PeopleStatus } from '@prisma/client';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetPeopleDto } from './dto/get-people.dto';
import { PeopleParamDto } from './dto/people-param.dto';
import { UpdatePeopleDto } from './dto/update-people.dto';
import { AccessTokenGuard } from '../guards/accessToken.guard';
import { ProfilePeopleEntity } from './entity/profile-people.entity';
import { User } from '../decorators/user.decorator';
import { ProfileService } from '../profile/profile.service';

@ApiTags('profile-people')
@UseGuards(AccessTokenGuard)
@Controller('profile-people')
export class ProfilePeopleController {
  constructor(
    private readonly profilePeopleService: ProfilePeopleService,
    private readonly profileService: ProfileService,
  ) {}

  @Post('saved')
  @ApiCreatedResponse({ type: ProfilePeopleEntity }) //не проверена ошибка throw new...
  async addSavedPeopleToProfile(@User('userId') userId: string, @Body() addDto: AddPeopleDto) {
    const profile = await this.profileService.findById(userId);
    if (profile) {
      return this.profilePeopleService.addPeople(addDto, PeopleStatus.SAVED, userId);
    }

    throw new NotFoundException('у этого пользователя нет профиля');
  }

  @Post('friend')
  @ApiCreatedResponse({ type: ProfilePeopleEntity }) //не проверена ошибка throw new...
  async addFriendsToProfile(@User('userId') userId: string, @Body() addDto: AddPeopleDto) {
    const profile = await this.profileService.findById(userId);
    if (profile) {
      return this.profilePeopleService.addPeople(addDto, PeopleStatus.FRIEND, userId);
    }

    throw new NotFoundException('у этого пользователя нет профиля');
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
