import {Body, Controller, Post, Req, Res} from '@nestjs/common';
import { AuthService } from './auth.service';
import {RegisterDto} from "./dto/register.dto";
import {LoginDto} from "./dto/login.dto";
import {Role} from "@prisma/client";
import { Response, Request } from 'express';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

	@Post('register/user')
	registerUser(@Body() registerDto: RegisterDto, @Res() res: Response) {
		return this.authService.register(registerDto, Role.USER, res);
	}

	@Post('register/manager')
	registerManager(@Body() registerDto: RegisterDto, @Res() res: Response) {
		return this.authService.register(registerDto, Role.MANAGER, res);
	}

	@Post('login')
	login(@Body() loginDto: LoginDto, @Res() res: Response) {
		return this.authService.login(loginDto, res);
	}

	@Post('refresh')
	refreshToken(@Req() req: Request, @Res() res: Response) {
		const refreshToken = req.cookies.refreshToken;
		return this.authService.refreshAccessToken(refreshToken, res);
	}

	@Post('logout')
	logOut(@Req() req: Request, @Res() res: Response) {
		res.clearCookie('refreshToken');
		return res.send({ message: 'Logged out successfully' });
	}
}
