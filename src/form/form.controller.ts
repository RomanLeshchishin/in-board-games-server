import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { FormService } from './form.service';
import { CreateFormDto } from './dto/create-form.dto';
import { User } from '../decorators/user.decorator';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '@prisma/client';
import { RoleGuard } from '../guards/role.guard';
import { AccessTokenGuard } from '../guards/accessToken.guard';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FormEntity } from './entity/form.entity';
import { UpdateFreezeAtDto } from './dto/update-freeze-at.dto';
import { UpdateBlockedAtDto } from './dto/update-blocked-at.dto';

@ApiTags('forms')
@UseGuards(AccessTokenGuard)
@Controller('form')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Post()
  @ApiCreatedResponse({ type: FormEntity })
  create(@User('userId') userId: string, @Body() createFormDto: CreateFormDto) {
    return this.formService.create(createFormDto, userId);
  }

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(RoleGuard)
  @ApiOkResponse({ type: FormEntity, isArray: true })
  getAll() {
    return this.formService.findAll();
  }

  @Get()
  @ApiOkResponse({ type: FormEntity, isArray: true })
  getAllNoFreezeAndBlocked() {
    return this.formService.findAllNoFreezeAndBlocked();
  }

  @Get('id')
  @ApiOkResponse({ type: FormEntity })
  getByUserId(@User('userId') userId: string) {
    return this.formService.findById(userId);
  }

  @Put()
  @ApiOkResponse({ type: FormEntity })
  update(@User('userId') userId: string, @Body() updateFormDto: Partial<CreateFormDto>) {
    return this.formService.update(updateFormDto, userId);
  }

  @Put('freeze')
  @ApiOkResponse({ type: FormEntity })
  updateFreezeAt(@User('userId') userId: string, @Body() updateFreezeAtDto: UpdateFreezeAtDto) {
    return this.formService.updateFreezeAt(updateFreezeAtDto, userId);
  }

  @Put('block/:userId')
  @Roles(Role.ADMIN)
  @UseGuards(RoleGuard)
  @ApiOkResponse({ type: FormEntity })
  updateBlockedAt(@Param('userId') userId: string, @Body() updateBlockedAtDto: UpdateBlockedAtDto) {
    return this.formService.updateBlockedAt(updateBlockedAtDto, userId);
  }

  @Delete()
  @ApiOkResponse({ type: FormEntity })
  delete(@User('userId') userId: string) {
    return this.formService.delete(userId);
  }
}
