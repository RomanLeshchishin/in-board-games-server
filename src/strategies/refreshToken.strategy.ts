import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const cookieHeader = request.headers.cookie;
          console.log('Cookies:', request.headers.cookie);
          if (cookieHeader) {
            const cookies = Object.fromEntries(
              cookieHeader
                .split(';')
                .map(c => c.trim().split('='))
                .map(([key, ...val]) => [key, val.join('=')]),
            );
            return cookies['refreshToken'] || null;
          }
          return null;
        },
      ]),
      secretOrKey: configService.getOrThrow('JWT_REFRESH_SECRET'),
    });
  }

  async validate(payload: { userId: string }) {
    const user = await this.usersService.findById(payload.userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    return payload;
  }
}
