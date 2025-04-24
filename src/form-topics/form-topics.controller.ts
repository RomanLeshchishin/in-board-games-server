import { Controller, Delete, Get, UseGuards } from '@nestjs/common';
import { FormTopicsService } from './form-topics.service';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '@prisma/client';
import { RoleGuard } from '../guards/role.guard';
import { ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from '../guards/accessToken.guard';

@ApiTags('form-topics')
@UseGuards(AccessTokenGuard)
@Controller('form-topics')
export class FormTopicsController {
  constructor(private readonly formTopicsService: FormTopicsService) {}

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(RoleGuard)
  getAll() {
    return this.formTopicsService.findAll();
  }
}
