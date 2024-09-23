import { ApiProperty } from '@nestjs/swagger';
import { WsEventDefinition } from 'src/shared/ws-message-definition';
import { MessageDTO } from './message-dto';

export class IncomingMessageEvent extends WsEventDefinition<MessageDTO> {
  public static readonly eventType = 'INCOMING_MESSAGE';

  @ApiProperty({ enum: [IncomingMessageEvent.eventType] })
  public messageType: string;

  @ApiProperty({ type: () => MessageDTO })
  public dtoPayload: MessageDTO;
}
