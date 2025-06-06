import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { Role } from '@prisma/client';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from './entity/auth.entity';
import { TokenEntity } from './entity/token.entity';
import { Response } from 'express';
import { UserEntity } from '../users/entity/user.entity';
import { ProfileService } from '../profile/profile.service';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private userService: UsersService,
    private profileService: ProfileService,
  ) {}

  async register(dto: RegisterDto, role: Role, res: Response): Promise<AuthEntity> {
    const candidate = await this.userService.findByEmail(dto.email);
    if (candidate) {
      throw new HttpException(`Пользователь с email ${dto.email} уже существует`, HttpStatus.BAD_REQUEST);
    }

    const user = await this.userService.create(dto, role);
    const tokens = await this.generateTokens(user.id, user.role);
    await this.profileService.create(user.id);

    this.setRefreshToCookie('refreshToken', tokens.refreshToken, res);

    return { user, accessToken: tokens.accessToken };
  }

  async login(dto: LoginDto, res: Response): Promise<AuthEntity> {
    const user = await this.userService.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException({ message: 'Неправильный пароль или email' });
    }

    const passwordEquals = await bcrypt.compare(dto.password, user.password);
    if (!passwordEquals) {
      throw new UnauthorizedException({ message: 'Неправильный пароль или email' });
    }

    const tokens = await this.generateTokens(user.id, user.role);
    this.setRefreshToCookie('refreshToken', tokens.refreshToken, res);

    const userResponse: UserEntity = {
      id: user.id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    return { user: userResponse, accessToken: tokens.accessToken };
  }

  async refreshAccessToken(refreshToken: string, res: Response): Promise<Omit<TokenEntity, 'refreshToken'>> {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.getOrThrow('JWT_REFRESH_SECRET'),
      });
      const tokens = await this.generateTokens(payload.userId, payload.role);
      this.setRefreshToCookie('refreshToken', tokens.refreshToken, res);

      return { accessToken: tokens.accessToken };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  private async generateTokens(userId: string, role: Role): Promise<TokenEntity> {
    const accessToken = this.jwtService.sign(
      { userId, role },
      {
        secret: this.configService.getOrThrow('JWT_ACCESS_SECRET'),
        expiresIn: '5d',
      },
    );

    const refreshToken = this.jwtService.sign(
      { userId, role },
      {
        secret: this.configService.getOrThrow('JWT_REFRESH_SECRET'),
        expiresIn: '7d',
      },
    );

    return { accessToken, refreshToken };
  }

  private setRefreshToCookie(title: string, value: string, res: Response) {
    res.cookie(title, value, {
      httpOnly: true,
      secure: false,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000, //7d
      path: '/',
    });
  }
}
