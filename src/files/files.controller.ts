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
import { UploadFilesDto } from './dto/uploadFiles.dto';
import { GetFilesDto } from './dto/getFiles.dto';
import { ApiConsumes, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from '../guards/accessToken.guard';
import { FileEntity } from './entity/file.entity';
import { UploadFilesEntity } from './entity/uploadFiles.entity';
import { GetFileDto } from './dto/getFile.dto';
import { ModelTypes } from '../decorators/modelTypes.decorator';
import { ModelTypeGuard } from '../guards/modelType.guard';
import { GetAuthFilesDto } from './dto/getAuthFiles.dto';

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
  @UseGuards(ModelTypeGuard)
  @ApiOkResponse({ type: FileEntity })
  @ModelTypes('AVATAR', 'COMMUNITY', 'EVENT', 'FEEDBACK')
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
  @UseGuards(ModelTypeGuard)
  @ApiOkResponse({ type: FileEntity, isArray: true })
  @ModelTypes('AVATAR', 'COMMUNITY', 'EVENT', 'FEEDBACK')
  getNoAuthFilesByModelId(@Query() getFilesDto: GetFilesDto) {
    return this.filesService.findFilesByModelId(getFilesDto);
  }

  @Get('all-protected/')
  @UseGuards(AccessTokenGuard)
  @ApiOkResponse({ type: FileEntity, isArray: true })
  getAuthFilesByModelId(@Query() getAuthFilesDto: GetAuthFilesDto) {
    return this.filesService.findFilesByModelId(getAuthFilesDto);
  }

  @Delete('/:id')
  @UseGuards(AccessTokenGuard)
  deleteFileById(@Param('id') id: string) {
    return this.filesService.deleteFileById(id);
  }
}
