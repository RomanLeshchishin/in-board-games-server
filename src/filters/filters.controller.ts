import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { FiltersService } from './filters.service';
import { FormModelType } from '@prisma/client';
import { FilterByManyDto } from './dto/filter-by-many.dto';
import { AccessTokenGuard } from '../guards/accessToken.guard';

@Controller('filters')
export class FiltersController {
  constructor(private readonly filtersService: FiltersService) {}

  @Get('/interests')
  filterByInterests(@Query('interestId') interestId: string) {
    return this.filtersService.filterByOne(interestId, FormModelType.INTEREST);
  }

  @Get('/topics')
  @UseGuards(AccessTokenGuard)
  filterByTopics(@Query('topicId') topicId: string) {
    return this.filtersService.filterByOne(topicId, FormModelType.TOPIC);
  }

  @Get('/games')
  @UseGuards(AccessTokenGuard)
  filterByGames(@Query('gameId') gameId: string) {
    return this.filtersService.filterByOne(gameId, FormModelType.GAME);
  }

  @Get('/communities')
  @UseGuards(AccessTokenGuard)
  filterByCommunities(@Query('communityId') communityId: string) {
    return this.filtersService.filterByOne(communityId, FormModelType.COMMUNITY);
  }

  @Post('/many')
  @UseGuards(AccessTokenGuard)
  filterByMany(@Body() filters: FilterByManyDto[]) {
    return this.filtersService.filterByMany(filters);
  }
}
