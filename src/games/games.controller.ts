import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { GamesService } from './games.service';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '@prisma/client';
import { RoleGuard } from '../guards/role.guard';
import { ApiConsumes, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { TopicManyEntity } from '../topics/entity/topic-many.entity';
import { CreateGameDto } from './dto/create-game.dto';
import { GameEntity } from './entity/game.entity';
import { GetGameEntity } from './entity/get-game.entity';
import { AccessTokenGuard } from '../guards/accessToken.guard';

@ApiTags('games')
@UseGuards(AccessTokenGuard)
@Controller('api/games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(RoleGuard)
  @ApiCreatedResponse({ type: GameEntity })
  create(@Body() createGameDto: CreateGameDto) {
    return this.gamesService.create(createGameDto);
  }

  @Post('/many')
  @HttpCode(200)
  @Roles(Role.ADMIN)
  @UseGuards(RoleGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiCreatedResponse({ type: TopicManyEntity })
  async CreateMany(@UploadedFile() file: Express.Multer.File) {
    if (file.mimetype !== 'text/plain') {
      throw new Error('Only .txt files are allowed');
    }

    return this.gamesService.createMany(file);
  }

  @Get()
  @ApiOkResponse({ type: GetGameEntity, isArray: true })
  getAll() {
    return this.gamesService.findAll();
  }

  @Get('/id/:id')
  @ApiOkResponse({ type: GetGameEntity })
  getById(@Param('id') id: string) {
    return this.gamesService.findById(id);
  }

  @Put('/:id')
  @Roles(Role.ADMIN)
  @UseGuards(RoleGuard)
  @ApiOkResponse({ type: GameEntity })
  update(@Param('id') id: string, @Body() updateGameDto: Partial<CreateGameDto>) {
    return this.gamesService.update(id, updateGameDto);
  }

  @Delete('/:id')
  @Roles(Role.ADMIN)
  @UseGuards(RoleGuard)
  @ApiOkResponse({ type: GameEntity })
  delete(@Param('id') id: string) {
    return this.gamesService.delete(id);
  }
}
