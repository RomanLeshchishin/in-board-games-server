import { Body, Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from '@prisma/client';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entity/user.entity';
import { AccessTokenGuard } from '../guards/accessToken.guard';
import { RoleGuard } from '../guards/role.guard';
import { Roles } from '../decorators/roles.decorator';

@ApiTags('users')
@Controller('users')
@UseGuards(AccessTokenGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(RoleGuard)
  @ApiCreatedResponse({ type: UserEntity })
  create(@Body() createUserDto: CreateUserDto, role?: Role) {
    return this.usersService.create(createUserDto, role);
  }

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(RoleGuard)
  @ApiOkResponse({ type: UserEntity, isArray: true })
  getAll() {
    return this.usersService.findAll();
  }

  @Get('email/:email')
  @ApiOkResponse({ type: UserEntity })
  getByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @Get('/:id')
  @ApiOkResponse({ type: UserEntity })
  getById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }
}
