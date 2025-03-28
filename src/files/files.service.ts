import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MFile } from './MFile.class';
import sharp from 'sharp';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { UploadFilesDto } from './dto/uploadFiles.dto';
import { UploadFilesEntity } from './entity/uploadFiles.entity';
import { GetFilesDto } from './dto/getFiles.dto';
import { FileEntity } from './entity/file.entity';

@Injectable()
export class FilesService {
  private s3: S3;

  constructor(
    private prismaService: PrismaService,
    private configService: ConfigService,
  ) {
    this.s3 = new S3({
      endpoint: this.configService.getOrThrow('YANDEX_STORAGE_ENDPOINT'),
      region: this.configService.getOrThrow('YANDEX_STORAGE_REGION'),
      credentials: {
        accessKeyId: this.configService.getOrThrow('YANDEX_STORAGE_ACCESS_KEY'),
        secretAccessKey: this.configService.getOrThrow('YANDEX_STORAGE_SECRET_KEY'),
      },
    });
  }

  async uploadFileToBucket(fileBuffer: Buffer, filename: string): Promise<string> {
    const bucketName = this.configService.get('YANDEX_STORAGE_BUCKET_NAME');

    const uploadResult = await this.s3
      .upload({
        Bucket: bucketName,
        Key: filename,
        Body: fileBuffer,
        ACL: 'public-read',
      })
      .promise();

    return uploadResult.Location; // Возвращает публичную ссылку на файл
  }

  async saveFileToDatabase(fileName: string, fileLink: string, dto: UploadFilesDto): Promise<UploadFilesEntity> {
    const newFile = await this.prismaService.file.create({
      data: { modelId: dto.modelId, modelType: dto.modelType, fileName, fileLink },
    });
    return { id: newFile.id, fileName: newFile.fileName, link: fileLink };
  }

  async findFileById(id: string): Promise<FileEntity> {
    const file = await this.prismaService.file.findUnique({ where: { id } });
    if (!file) {
      throw new NotFoundException();
    }
    return file;
  }

  findFilesByModelId(dto: GetFilesDto): Promise<FileEntity[]> {
    if (dto.modelType) {
      return this.prismaService.file.findMany({ where: { id: dto.modelId, modelType: dto.modelType } });
    } else {
      return this.prismaService.file.findMany({ where: { id: dto.modelId } });
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
    return this.prismaService.file.delete({ where: { id } });
  }
}
