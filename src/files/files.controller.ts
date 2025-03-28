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
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadFilesDto } from './dto/uploadFiles.dto';
import { GetFilesDto } from './dto/getFiles.dto';
import { ApiConsumes, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { AccessTokenGuard } from '../guards/accessToken.guard';
import { FileEntity } from './entity/file.entity';
import { UploadFilesEntity } from './entity/uploadFiles.entity';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @HttpCode(200)
  @UseGuards(AccessTokenGuard)
  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  @ApiCreatedResponse({ type: UploadFilesEntity })
  async uploadFiles(@UploadedFiles() files: Express.Multer.File[], @Body() uploadFilesDto: UploadFilesDto) {
    const newFiles = await this.filesService.filterFiles(files);
    return this.filesService.saveFiles(newFiles, uploadFilesDto);
  }

  @Get('/:id')
  @ApiOkResponse({ type: FileEntity })
  getFileById(@Param('id') id: string) {
    //сделать защищённые запросы для неавторизованных по определённым типам файлов
    return this.filesService.findFileById(id);
  }

  @Get('modelId/')
  @ApiOkResponse({ type: FileEntity, isArray: true })
  getFilesByModelId(@Query() getFilesDto: GetFilesDto) {
    //сделать защищённые запросы для неавторизованных по определённым типам файлов
    return this.filesService.findFilesByModelId(getFilesDto);
  }

  @Delete('/:id')
  @UseGuards(AccessTokenGuard)
  deleteFileById(@Param('id') id: string) {
    return this.filesService.deleteFileById(id);
  }
}
