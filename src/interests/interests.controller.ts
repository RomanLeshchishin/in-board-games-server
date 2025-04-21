import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Put,
} from '@nestjs/common';
import { InterestsService } from './interests.service';
import { CreateInterestDto } from './dto/create-interest.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from '../guards/accessToken.guard';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '@prisma/client';
import { RoleGuard } from '../guards/role.guard';
import { InterestEntity } from './entities/interest.entity';
import { InterestManyEntity } from './entities/interest-many.entity';

@ApiTags('interests')
@UseGuards(AccessTokenGuard)
@Controller('interests')
export class InterestsController {
  constructor(private readonly interestsService: InterestsService) {}

  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(RoleGuard)
  @ApiCreatedResponse({ type: InterestEntity })
  create(@Body() createInterestDto: CreateInterestDto) {
    return this.interestsService.create(createInterestDto);
  }

  @Post('/many')
  @HttpCode(200)
  @Roles(Role.ADMIN)
  @UseGuards(RoleGuard)
  @UseInterceptors(FilesInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiCreatedResponse({ type: InterestManyEntity })
  async CreateMany(@UploadedFile() file: Express.Multer.File) {
    if (file.mimetype !== 'text/plain') {
      throw new Error('Only .txt files are allowed');
    }

    return this.interestsService.createMany(file);
  }

  @Get()
  @ApiOkResponse({ type: InterestEntity, isArray: true })
  getAll() {
    return this.interestsService.findAll();
  }

  @Get('/:id')
  @ApiOkResponse({ type: InterestEntity })
  getById(@Param('id') id: string) {
    return this.interestsService.findById(id);
  }

  @Put('/:id')
  @Roles(Role.ADMIN)
  @UseGuards(RoleGuard)
  @ApiOkResponse({ type: InterestEntity })
  update(@Param('id') id: string, @Body() updateInterestDto: Partial<CreateInterestDto>) {
    return this.interestsService.update(id, updateInterestDto);
  }

  @Delete('/:id')
  @Roles(Role.ADMIN)
  @UseGuards(RoleGuard)
  @ApiOkResponse({ type: InterestEntity })
  delete(@Param('id') id: string) {
    return this.interestsService.delete(id);
  }
}
