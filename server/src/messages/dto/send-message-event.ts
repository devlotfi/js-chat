import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, Length } from 'class-validator';
import { WsEventDefinition } from 'src/shared/ws-message-definition';
import { MessageDTO } from './message-dto';

export class SendMessageDTO {
  @ApiProperty()
  @Length(1, 512)
  public text: string;

  @ApiProperty()
  @IsUUID()
  public to: string;
}

export class SendMessageEvent extends WsEventDefinition<
  SendMessageDTO,
  MessageDTO
> {
  public static readonly eventType = 'SEND_MESSAGE';

  @ApiProperty({ enum: [SendMessageEvent.eventType] })
  public messageType: string;

  @ApiProperty({ type: () => SendMessageDTO })
  public dtoPayload: SendMessageDTO;

  @ApiProperty({ type: () => MessageDTO })
  public responsePayload: MessageDTO;
}
