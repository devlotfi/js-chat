import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { SendMessageDTO, SendMessageEvent } from './dto/send-message-event';

@WebSocketGateway(5000, {
  transports: ['websocket'],
  cors: {
    origin: '*',
  },
})
export class MessagesGateway {
  @SubscribeMessage(SendMessageEvent.eventType)
  public handleMessage(@MessageBody() sendMessageDto: SendMessageDTO): string {
    console.log(sendMessageDto);

    return 'Hello world!';
  }
}
