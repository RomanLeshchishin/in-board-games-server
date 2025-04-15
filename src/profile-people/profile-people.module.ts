import { Module } from '@nestjs/common';
import { ProfilePeopleService } from './profile-people.service';
import { ProfilePeopleController } from './profile-people.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProfilePeopleController],
  providers: [ProfilePeopleService],
})
export class ProfilePeopleModule {}
