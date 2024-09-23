import { ApiProperty } from '@nestjs/swagger';
import { MessageDTO } from './message-dto';
import { WsServerEventDefinition } from 'src/shared/ws-message-definition';

export class IncomingMessageEvent extends WsServerEventDefinition<MessageDTO> {
  public static readonly eventType = 'INCOMING_MESSAGE';

  @ApiProperty({ enum: [IncomingMessageEvent.eventType] })
  public messageType: string;

  @ApiProperty({ type: () => MessageDTO })
  public dtoPayload: MessageDTO;
}
