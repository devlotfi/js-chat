import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

export class MessagesQuery {
  @ApiProperty({ required: false })
  @IsUUID()
  @IsOptional()
  public cursor: string;
}
