import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {ConfigService} from "@nestjs/config";
import {UsersService} from "../users/users.service";
import {RegisterDto} from "./dto/register.dto";
import {Role} from "@prisma/client";
import {LoginDto} from "./dto/login.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {

	constructor(
		private prismaService: PrismaService,
		private configService: ConfigService,
		private userService: UsersService,
	) {}

	async register(dto: RegisterDto, role: Role) {
		const candidate = await this.userService.findByEmail(dto.email)

		if (candidate) {
			throw new HttpException(`Пользователь с email ${dto.email} уже существует`, HttpStatus.BAD_REQUEST)
		}

		const createdUser = await this.userService.create(dto, role)
	}

	async login(dto: LoginDto) {
		const user = await this.userService.findByEmail(dto.email)

		if (!user) {
			throw new UnauthorizedException({message: 'Неправильный пароль или email'})
		}

		const passwordEquals = await bcrypt.compare(dto.password, user.password)
		if (!passwordEquals) {
			throw new UnauthorizedException({message: 'Неправильный пароль или email'})
		}
	}
}
