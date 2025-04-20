import { ApiProperty } from '@nestjs/swagger';

export class UpdateFreezeAtDto {
  @ApiProperty()
  freezeAt: Date;
}
