import { Body, Controller, HttpCode, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadFilesDto } from './dto/uploadFiles.dto';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @HttpCode(200)
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFiles(@UploadedFiles() files: Express.Multer.File[], @Body() uploadFilesDto: UploadFilesDto) {
    const newFiles = await this.filesService.filterFiles(files);
    return this.filesService.saveFiles(newFiles, uploadFilesDto);
  }
}
