import { Controller, Delete, Get, UseGuards } from '@nestjs/common';
import { FormGamesService } from './form-games.service';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '@prisma/client';
import { RoleGuard } from '../guards/role.guard';
import { ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from '../guards/accessToken.guard';

@ApiTags('form-games')
@UseGuards(AccessTokenGuard)
@Controller('form-games')
export class FormGamesController {
  constructor(private readonly formGamesService: FormGamesService) {}

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(RoleGuard)
  getAll() {
    return this.formGamesService.findAll();
  }
}
