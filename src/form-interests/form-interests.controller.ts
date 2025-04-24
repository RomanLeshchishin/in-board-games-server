import { Controller, Delete, Get, UseGuards } from '@nestjs/common';
import { FormInterestsService } from './form-interests.service';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '@prisma/client';
import { RoleGuard } from '../guards/role.guard';
import { ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from '../guards/accessToken.guard';

@ApiTags('form-interests')
@UseGuards(AccessTokenGuard)
@Controller('form-interests')
export class FormInterestsController {
  constructor(private readonly formInterestsService: FormInterestsService) {}

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(RoleGuard)
  getAll() {
    return this.formInterestsService.findAll();
  }
}
