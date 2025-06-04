import {
  Body,
  Get,
  Controller,
  Delete,
  Param,
  HttpCode,
  Post,
  UploadedFiles,
  UseInterceptors,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadFilesDto } from './dto/upload-files.dto';
import { GetFilesDto } from './dto/get-files.dto';
import { ApiConsumes, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from '../guards/accessToken.guard';
import { FileEntity } from './entity/file.entity';
import { UploadFilesEntity } from './entity/uploadFiles.entity';
import { GetFileDto } from './dto/get-file.dto';
import { FileModelTypes } from '../decorators/fileModelTypes.decorator';
import { FileModelTypeGuard } from '../guards/fileModelType.guard';
import { GetAuthFilesDto } from './dto/get-auth-files.dto';
import { FileModelType } from '@prisma/client';

@ApiTags('files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @HttpCode(200)
  @UseGuards(AccessTokenGuard)
  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  @ApiCreatedResponse({ type: UploadFilesEntity })
  async uploadFiles(@UploadedFiles() files: Express.Multer.File[], @Body() uploadFilesDto: UploadFilesDto, @Req() reg) {
    const newFiles = await this.filesService.filterFiles(files);
    return this.filesService.saveFiles(newFiles, uploadFilesDto, reg);
  }

  @Get('single/')
  @UseGuards(FileModelTypeGuard)
  @ApiOkResponse({ type: FileEntity })
  @FileModelTypes(FileModelType.AVATAR, FileModelType.COMMUNITY, FileModelType.EVENT, FileModelType.FEEDBACK)
  getNoAuthFileById(@Query() getFileDto: GetFileDto) {
    return this.filesService.findFileByIdAndModelType(getFileDto);
  }

  @Get('single-protected/:id')
  @UseGuards(AccessTokenGuard)
  @ApiOkResponse({ type: FileEntity })
  getAuthFileById(@Param('id') id: string) {
    return this.filesService.findFileById(id);
  }

  @Get('all/')
  @UseGuards(FileModelTypeGuard)
  @ApiOkResponse({ type: FileEntity, isArray: true })
  @FileModelTypes(FileModelType.AVATAR, FileModelType.COMMUNITY, FileModelType.EVENT, FileModelType.FEEDBACK)
  getNoAuthFilesByModelId(@Query() getFilesDto: GetFilesDto) {
    return this.filesService.findFilesByModelId(getFilesDto);
  }

  @Get('all-protected/')
  @UseGuards(AccessTokenGuard)
  @ApiOkResponse({ type: FileEntity, isArray: true })
  getAuthFilesByModelId(@Query() getAuthFilesDto: GetAuthFilesDto) {
    return this.filesService.findFilesByModelId(getAuthFilesDto);
  }

  @Delete('/:id') //проверка на modelId..
  @UseGuards(AccessTokenGuard)
  deleteFileById(@Param('id') id: string) {
    return this.filesService.deleteFileById(id);
  }
}
