import {Body, Controller, Post} from '@nestjs/common';
import { AuthService } from './auth.service';
import {RegisterDto} from "./dto/register.dto";
import {LoginDto} from "./dto/login.dto";

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

	@Post('register/user')
	registerUser(@Body() registerDto: RegisterDto){}

	@Post('register/manager')
	registerManager(@Body() registerDto: RegisterDto){}

	@Post('login')
	login(@Body() loginDto: LoginDto){}

	refreshToken(){}

	logOut(){}
}
