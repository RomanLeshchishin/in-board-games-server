import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { FormService } from './form.service';
import { CreateFormDto } from './dto/create-form.dto';
import { User } from '../decorators/user.decorator';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '@prisma/client';
import { RoleGuard } from '../guards/role.guard';
import { AccessTokenGuard } from '../guards/accessToken.guard';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FormBasicEntity } from './entity/form-basic.entity';
import { UpdateFreezeAtDto } from './dto/update-freeze-at.dto';
import { UpdateBlockedAtDto } from './dto/update-blocked-at.dto';
import { FormAdvancedEntity } from './entity/form-advanced.entity';

@ApiTags('form')
@Controller('form')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  @ApiCreatedResponse({ type: FormBasicEntity })
  create(@User('userId') userId: string, @Body() createFormDto: CreateFormDto) {
    return this.formService.create(createFormDto, userId);
  }

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(AccessTokenGuard)
  @ApiOkResponse({ type: FormBasicEntity, isArray: true })
  getAll() {
    return this.formService.findAll();
  }

  @Get('/available')
  @UseGuards(AccessTokenGuard)
  @ApiOkResponse({ type: FormBasicEntity, isArray: true })
  getAllNoFreezeAndBlocked() {
    return this.formService.findAllNoFreezeAndBlocked();
  }

  @Get('/id')
  @UseGuards(AccessTokenGuard)
  @ApiOkResponse({ type: FormAdvancedEntity })
  getByUserId(@User('userId') userId: string) {
    return this.formService.findById(userId);
  }

  @Get('/id/interests/:userId')
  getFormInterests(@Param('userId') userId: string) {
    return this.formService.findFormInterestsById(userId);
  }

  @Put()
  @UseGuards(AccessTokenGuard)
  @ApiOkResponse({ type: FormBasicEntity })
  update(@User('userId') userId: string, @Body() updateFormDto: Partial<CreateFormDto>) {
    return this.formService.update(updateFormDto, userId);
  }

  @Put('freeze')
  @UseGuards(AccessTokenGuard)
  @ApiOkResponse({ type: FormBasicEntity })
  updateFreezeAt(@User('userId') userId: string, @Body() updateFreezeAtDto: UpdateFreezeAtDto) {
    return this.formService.updateFreezeAt(updateFreezeAtDto, userId);
  }

  @Put('block/:userId')
  @Roles(Role.ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(AccessTokenGuard)
  @ApiOkResponse({ type: FormBasicEntity })
  updateBlockedAt(@Param('userId') userId: string, @Body() updateBlockedAtDto: UpdateBlockedAtDto) {
    return this.formService.updateBlockedAt(updateBlockedAtDto, userId);
  }

  @Delete()
  @UseGuards(AccessTokenGuard)
  @ApiOkResponse({ type: FormBasicEntity })
  delete(@User('userId') userId: string) {
    return this.formService.delete(userId);
  }
}
