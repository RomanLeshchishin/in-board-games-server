import { Body, Controller, Delete, Get, NotFoundException, Post, UseGuards } from '@nestjs/common';
import { FormModelsService } from './form-models.service';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '@prisma/client';
import { RoleGuard } from '../guards/role.guard';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from '../guards/accessToken.guard';
import { FormModelManyDto } from './dto/form-model-many.dto';
import { User } from '../decorators/user.decorator';
import { FormModelManyEntity } from './entity/form-model-many.entity';
import { FormModelEntity } from './entity/form-model.entity';
import { FormService } from '../form/form.service';

@ApiTags('form-models')
@UseGuards(AccessTokenGuard)
@Controller('form-models')
export class FormModelsController {
  constructor(private readonly formModelsService: FormModelsService) {}

  @Post()
  @ApiCreatedResponse({ type: FormModelManyEntity }) //не проверена ошибка throw new...
  async createMany(@User('userId') userId: string, @Body() createManyFormModelsDto: FormModelManyDto) {
    return this.formModelsService.createMany(userId, createManyFormModelsDto);
  }

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(RoleGuard)
  @ApiOkResponse({ type: FormModelEntity, isArray: true })
  getAll() {
    return this.formModelsService.findAll();
  }

  @Delete()
  @ApiOkResponse({ type: FormModelManyEntity })
  deleteMany(@User('userId') userId: string, @Body() deleteManyFormModelsDto: FormModelManyDto) {
    return this.formModelsService.deleteMany(userId, deleteManyFormModelsDto);
  }
}
