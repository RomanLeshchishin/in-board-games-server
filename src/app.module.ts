import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProfileModule } from './profile/profile.module';
import { FilesModule } from './files/files.module';
import { ProfilePeopleModule } from './profile-people/profile-people.module';

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
})
export class AppModule {}
