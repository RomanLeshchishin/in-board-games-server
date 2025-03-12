import {Body, Controller, Get, Post, Param, Put} from '@nestjs/common';
import { UsersService } from './users.service';
import {CreateUserDto} from "./dto/create-user.dto";
import {Role} from "@prisma/client";
import {UpdateUserDto} from "./dto/update-user.dto";
import {ApiCreatedResponse, ApiOkResponse} from "@nestjs/swagger";
import {UserEntity} from "./entity/user.entity";

@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) {}

	@Post()
	@ApiCreatedResponse({ type: UserEntity })
	create(@Body() createUserDto: CreateUserDto, role?: Role) {
		return this.usersService.create(createUserDto, role);
	}

	@Get()
	@ApiOkResponse({ type: UserEntity, isArray: true })
	getAll() {
		return this.usersService.findAll();
	}

	@Get('/:email')
	@ApiOkResponse({ type: UserEntity })
	getByEmail(@Param('email') email: string) {
		return this.usersService.findByEmail(email);
	}

	@Get('/:id')
	@ApiOkResponse({ type: UserEntity })
	getById(@Param('id') id: string) {
		return this.usersService.findById(id);
	}

	@Put('/:id')
	@ApiCreatedResponse({ type: UserEntity })
	update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.usersService.update(id, updateUserDto);
	}
}
