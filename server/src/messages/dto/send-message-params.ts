import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class SendMessageParams {
  @ApiProperty()
  @IsUUID()
  public conversationId: string;
}
