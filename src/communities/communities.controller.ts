import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CommunitiesService } from './communities.service';
import { AccessTokenGuard } from '../guards/accessToken.guard';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '@prisma/client';
import { RoleGuard } from '../guards/role.guard';

@UseGuards(AccessTokenGuard)
@Controller('api/communities')
export class CommunitiesController {
  constructor(private readonly communityService: CommunitiesService) {}

  @Post()
  create(dto) {
    return this.communityService.create(dto);
  }

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(RoleGuard)
  getAll() {
    return this.communityService.findAll();
  }

  @Get()
  getAllNoBlocked() {
    return this.communityService.findAllNoBlocked();
  }
}
