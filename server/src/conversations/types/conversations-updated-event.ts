import { ApiProperty } from '@nestjs/swagger';
import { WsEmptyEventDefinition } from 'src/shared/ws-message-definition';

export class ConversationsUpdatedEvent extends WsEmptyEventDefinition {
  public static readonly eventType = 'CONVERSATIONS_UPDATED';

  @ApiProperty({ enum: [ConversationsUpdatedEvent.eventType] })
  public messageType: string;
}
