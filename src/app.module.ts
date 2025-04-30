import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProfileModule } from './profile/profile.module';
import { FilesModule } from './files/files.module';
import { ProfilePeopleModule } from './profile-people/profile-people.module';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { FormModule } from './form/form.module';
import { InterestsModule } from './interests/interests.module';
import { TopicsModule } from './topics/topics.module';
import { GamesModule } from './games/games.module';
import { FormModelsModule } from './form-models/form-models.module';
import { CommunitiesModule } from './communities/communities.module';
import { EventsModule } from './events/events.module';

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
    FormModule,
    InterestsModule,
    TopicsModule,
    GamesModule,
    FormModelsModule,
    CommunitiesModule,
    EventsModule,
  ],
  providers: [AccessTokenStrategy, RefreshTokenStrategy],
})
export class AppModule {}
