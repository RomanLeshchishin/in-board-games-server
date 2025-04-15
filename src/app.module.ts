import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProfileModule } from './profile/profile.module';
import { FilesModule } from './files/files.module';
import { ProfilePeopleModule } from './profile-people/profile-people.module';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env',
    }),
    UsersModule,
    AuthModule,
    ProfileModule,
    FilesModule,
    ProfilePeopleModule,
  ],
  providers: [AccessTokenStrategy, RefreshTokenStrategy],
})
export class AppModule {}
