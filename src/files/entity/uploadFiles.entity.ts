import { ApiProperty } from '@nestjs/swagger';

export class UploadFilesEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  fileName: string;

  @ApiProperty()
  link: string;
}
