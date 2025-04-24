import { Controller, Get, UseGuards } from '@nestjs/common';
import { FormModelsService } from './form-models.service';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '@prisma/client';
import { RoleGuard } from '../guards/role.guard';
import { ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from '../guards/accessToken.guard';

@ApiTags('form-models')
@UseGuards(AccessTokenGuard)
@Controller('form-models')
export class FormModelsController {
  constructor(private readonly formModelsService: FormModelsService) {}

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(RoleGuard)
  getAll() {
    return this.formModelsService.findAll();
  }
}
