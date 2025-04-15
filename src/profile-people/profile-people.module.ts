import { Module } from '@nestjs/common';
import { ProfilePeopleService } from './profile-people.service';
import { ProfilePeopleController } from './profile-people.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { ProfileModule } from '../profile/profile.module';

@Module({
  imports: [PrismaModule, ProfileModule],
  controllers: [ProfilePeopleController],
  providers: [ProfilePeopleService],
})
export class ProfilePeopleModule {}
