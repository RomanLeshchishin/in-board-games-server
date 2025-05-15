import { Module } from '@nestjs/common';
import { FiltersService } from './filters.service';
import { FiltersController } from './filters.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { ProfileModule } from '../profile/profile.module';

@Module({
  imports: [PrismaModule, ProfileModule],
  controllers: [FiltersController],
  providers: [FiltersService],
})
export class FiltersModule {}
