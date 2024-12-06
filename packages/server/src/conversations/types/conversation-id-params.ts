import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class ConversationIdParams {
  @ApiProperty()
  @IsUUID()
  public conversationId: string;
}
