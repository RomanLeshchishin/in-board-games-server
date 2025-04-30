import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '@prisma/client';
import { RoleGuard } from '../guards/role.guard';
import { AccessTokenGuard } from '../guards/accessToken.guard';

@UseGuards(AccessTokenGuard)
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create(dto) {
    return this.eventsService.create(dto);
  }

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(RoleGuard)
  getAll() {
    return this.eventsService.findAll();
  }

  @Get()
  getAllNoBlocked() {
    return this.eventsService.findAllNoBlocked();
  }
}
