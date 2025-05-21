import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CommunitiesService } from './communities.service';
import { AccessTokenGuard } from '../guards/accessToken.guard';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '@prisma/client';
import { RoleGuard } from '../guards/role.guard';

@Controller('communities')
export class CommunitiesController {
  constructor(private readonly communityService: CommunitiesService) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  create(dto) {
    return this.communityService.create(dto);
  }

  @Get('/id/:id')
  getById(@Param('id') id: string) {
    return this.communityService.findById(id)
  }

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(AccessTokenGuard)
  getAll() {
    return this.communityService.findAll();
  }

  @Get()
  getAllNoBlocked() {
    return this.communityService.findAllNoBlocked();
  }
}
