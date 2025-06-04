import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Role } from '@prisma/client';
import { Response } from 'express';
import { Cookies } from '../decorators/cookies.decorator';
import { RefreshTokenGuard } from '../guards/refreshToken.guard';
import { AccessTokenGuard } from '../guards/accessToken.guard';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthEntity } from './entity/auth.entity';
import { AdminRegisterGuard } from '../guards/adminRegister.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register/user')
  @ApiCreatedResponse({ type: AuthEntity })
  registerUser(@Body() registerDto: RegisterDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.register(registerDto, Role.USER, res);
  }
  @Post('register/manager')
  @ApiCreatedResponse({ type: AuthEntity })
  registerManager(@Body() registerDto: RegisterDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.register(registerDto, Role.MANAGER, res);
  }
  @Post('register/admin')
  @UseGuards(AdminRegisterGuard)
  @ApiCreatedResponse({ type: AuthEntity })
  registerAdmin(@Body() registerDto: RegisterDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.register(registerDto, Role.ADMIN, res);
  }
  @Post('login')
  @UseGuards(AccessTokenGuard)
  @ApiCreatedResponse({ type: AuthEntity })
  login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(loginDto, res);
  }
  @Post('refresh')
  @UseGuards(RefreshTokenGuard)
  refreshToken(@Cookies('refreshToken') refreshToken: string, @Res({ passthrough: true }) res: Response) {
    if (!refreshToken) {
      throw new Error('Refresh token not found in cookies');
    }
    return this.authService.refreshAccessToken(refreshToken, res);
  }
  @Post('logout')
  @UseGuards(AccessTokenGuard)
  logOut(@Res() res: Response) {
    res.clearCookie('refreshToken');
    return res.send({ message: 'Logged out successfully' });
  }
}
