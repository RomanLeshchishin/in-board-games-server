import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { CommunityTopicsService } from './community-topics.service';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '@prisma/client';
import { RoleGuard } from '../guards/role.guard';
import { CommunityTopicManyDto } from './dto/community-topic-many.dto';
import { AccessTokenGuard } from '../guards/accessToken.guard';

@UseGuards(AccessTokenGuard)
@Controller('community-topics')
export class CommunityTopicsController {
  constructor(private readonly communityTopicsService: CommunityTopicsService) {}

  @Post()
  async createMany(@Body() createManyCommunityTopicsDto: CommunityTopicManyDto) {
    return this.communityTopicsService.createMany(createManyCommunityTopicsDto);
  }

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(RoleGuard)
  getAll() {
    return this.communityTopicsService.findAll();
  }

  @Delete()
  deleteMany(@Body() deleteManyCommunityTopicsDto: CommunityTopicManyDto) {
    return this.communityTopicsService.deleteMany(deleteManyCommunityTopicsDto);
  }
}
