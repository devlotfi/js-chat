import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class MessagesParams {
  @ApiProperty()
  @IsUUID()
  public conversationId: string;
}
