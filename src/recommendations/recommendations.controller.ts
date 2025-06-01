import { Controller, Get, UseGuards } from '@nestjs/common';
import { RecommendationsService } from './recommendations.service';
import { User } from '../decorators/user.decorator';
import { AccessTokenGuard } from '../guards/accessToken.guard';

@UseGuards(AccessTokenGuard)
@Controller('recommendations')
export class RecommendationsController {
  constructor(private readonly recommendationsService: RecommendationsService) {}

  @Get('/profiles')
  async getRecommendedProfiles(@User('userId') userId: string) {
    return this.recommendationsService.getRecommendations(userId);
  }
}
