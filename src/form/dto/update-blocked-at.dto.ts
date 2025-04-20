import { ApiProperty } from '@nestjs/swagger';

export class UpdateBlockedAtDto {
  @ApiProperty()
  blockedAt: Date;
}
