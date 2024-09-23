import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class ConversationDetailsParams {
  @ApiProperty()
  @IsUUID()
  public conversationId: string;
}
