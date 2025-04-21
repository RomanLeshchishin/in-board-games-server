import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Put,
} from '@nestjs/common';
import { TopicsService } from './topics.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { ApiConsumes, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '@prisma/client';
import { RoleGuard } from '../guards/role.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AccessTokenGuard } from '../guards/accessToken.guard';
import { TopicEntity } from './entities/topic.entity';
import { TopicManyEntity } from './entities/topic-many.entity';

@ApiTags('topics')
@UseGuards(AccessTokenGuard)
@Controller('topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(RoleGuard)
  @ApiCreatedResponse({ type: TopicEntity })
  create(@Body() createTopicDto: CreateTopicDto) {
    return this.topicsService.create(createTopicDto);
  }

  @Post('/many')
  @HttpCode(200)
  @Roles(Role.ADMIN)
  @UseGuards(RoleGuard)
  @UseInterceptors(FilesInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiCreatedResponse({ type: TopicManyEntity })
  async CreateMany(@UploadedFile() file: Express.Multer.File) {
    if (file.mimetype !== 'text/plain') {
      throw new Error('Only .txt files are allowed');
    }

    return this.topicsService.createMany(file);
  }

  @Get()
  @ApiOkResponse({ type: TopicEntity, isArray: true })
  getAll() {
    return this.topicsService.findAll();
  }

  @Get('/:id')
  @ApiOkResponse({ type: TopicEntity })
  getById(@Param('id') id: string) {
    return this.topicsService.findById(id);
  }

  @Put('/:id')
  @Roles(Role.ADMIN)
  @UseGuards(RoleGuard)
  @ApiOkResponse({ type: TopicEntity })
  update(@Param('id') id: string, @Body() updateTopicDto: Partial<CreateTopicDto>) {
    return this.topicsService.update(id, updateTopicDto);
  }

  @Delete('/:id')
  @Roles(Role.ADMIN)
  @UseGuards(RoleGuard)
  @ApiOkResponse({ type: TopicEntity })
  delete(@Param('id') id: string) {
    return this.topicsService.delete(id);
  }
}
