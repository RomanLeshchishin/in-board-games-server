import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AccessTokenStrategy } from '../strategies/accessToken.strategy';
import { RefreshTokenStrategy } from '../strategies/refreshToken.strategy';
import { ProfileModule } from '../profile/profile.module';

@Module({
  imports: [PrismaModule, PassportModule, JwtModule.register({}), UsersModule, ProfileModule],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
})
export class AuthModule {}
