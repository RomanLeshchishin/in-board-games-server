import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MFile } from './MFile.class';
import * as sharp from 'sharp';
import EasyYandexS3 from 'easy-yandex-s3';
import { ConfigService } from '@nestjs/config';
import { UploadFilesDto } from './dto/uploadFiles.dto';
import { UploadFilesEntity } from './entity/uploadFiles.entity';
import { GetFilesDto } from './dto/getFiles.dto';
import { FileEntity } from './entity/file.entity';
import { GetAuthFilesDto } from './dto/getAuthFiles.dto';
import { GetFileDto } from './dto/getFile.dto';

@Injectable()
export class FilesService {
  private s3: EasyYandexS3;
  private readonly MAX_FILE_SIZE = 10 * 1024 * 1024; //10 мб //.txt должен скачиваться, в браузере неправильно считывается
  // на фронте спрашивать про замену файла, если файл с таким названием уже есть в базе или проверка на бэкенде
  constructor(
    private prismaService: PrismaService,
    private configService: ConfigService,
  ) {
    this.s3 = new EasyYandexS3({
      auth: {
        accessKeyId: this.configService.getOrThrow('YANDEX_STORAGE_ACCESS_KEY'),
        secretAccessKey: this.configService.getOrThrow('YANDEX_STORAGE_SECRET_KEY'),
      },
      Bucket: this.configService.getOrThrow('YANDEX_STORAGE_BUCKET_NAME'),
      debug: true,
    });
  }

  async uploadFileToBucket(fileBuffer: Buffer, filename: string): Promise<string> {
    if (fileBuffer.length > this.MAX_FILE_SIZE) {
      throw new BadRequestException('Ошибка: слишком большой размер загружаемого файла');
    }
    const uploadResult = await this.s3.Upload(
      { buffer: fileBuffer, name: filename },
      '/uploads/', // Каталог внутри бакета
    );

    if (!uploadResult || typeof uploadResult !== 'object' || !('Location' in uploadResult)) {
      throw new BadRequestException('Ошибка: Не получилось загрузить файл в Yandex S3');
    }

    return uploadResult.Location;
  }

  async saveFileToDatabase(fileName: string, fileLink: string, dto: UploadFilesDto): Promise<UploadFilesEntity> {
    const newFile = await this.prismaService.file.create({
      data: { modelId: dto.modelId, modelType: dto.modelType, fileName, fileLink },
    });
    return { id: newFile.id, fileName: newFile.fileName, link: fileLink };
  }

  async findFileByIdAndModelType(dto: GetFileDto): Promise<FileEntity> {
    const file = await this.prismaService.file.findUnique({ where: { id: dto.id, modelType: dto.modelType } });
    if (!file) {
      throw new NotFoundException();
    }
    return file;
  }

  async findFileById(id: string): Promise<FileEntity> {
    const file = await this.prismaService.file.findUnique({ where: { id } });
    if (!file) {
      throw new NotFoundException();
    }
    return file;
  }

  findFilesByModelId(dto: GetFilesDto | GetAuthFilesDto): Promise<FileEntity[]> {
    if (dto.modelType) {
      return this.prismaService.file.findMany({ where: { modelId: dto.modelId, modelType: dto.modelType } });
    } else {
      return this.prismaService.file.findMany({ where: { modelId: dto.modelId } });
    }
  }

  async saveFiles(newFiles: MFile[], dto: UploadFilesDto): Promise<UploadFilesEntity[]> {
    const res = await Promise.all(
      newFiles.map(async file => {
        const fileLink = await this.uploadFileToBucket(file.buffer, file.originalname);
        const newFile = await this.saveFileToDatabase(file.originalname, fileLink, dto);
        return newFile;
      }),
    );

    return res;
  }

  private async convertToWebP(file: Buffer) {
    return sharp(file).webp().toBuffer();
  }

  async filterFiles(files: MFile[]) {
    const newFiles = await Promise.all(
      files.map(async file => {
        const mimetype = file.mimetype;
        const currentFileType = mimetype.split('/')[1];
        const newName = file.originalname.split('.')[0];
        const type = file.originalname.split('.')[1];

        if (mimetype.includes('image')) {
          if (currentFileType !== 'svg+xml') {
            const buffer = await this.convertToWebP(file.buffer);
            return new MFile({
              buffer,
              originalname: `${newName}.webp`,
              mimetype,
            });
          }
          return new MFile({
            buffer: file.buffer,
            originalname: `${newName}.svg`,
            mimetype,
          });
        }
        return new MFile({
          buffer: file.buffer,
          originalname: `${newName}.${type}`,
          mimetype,
        });
      }),
    );
    return newFiles;
  }

  async deleteFileById(id: string): Promise<FileEntity> {
    // удаление файлов в yandex object storage
    const file = await this.prismaService.file.delete({ where: { id } });
    await this.s3.Remove(file.fileLink); // не работает
    return file;
  }
}
