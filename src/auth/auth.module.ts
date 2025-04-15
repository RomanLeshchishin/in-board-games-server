import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { ProfileModule } from '../profile/profile.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PassportModule, JwtModule.register({}), UsersModule, ProfileModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
