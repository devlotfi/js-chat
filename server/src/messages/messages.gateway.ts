import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway(5000, {
  transports: ['websocket'],
  cors: {
    origin: '*',
  },
})
export class MessagesGateway {
  @WebSocketServer()
  public server: Server;

  @SubscribeMessage('SendMessageEvent.eventType')
  public handleMessage(@MessageBody() sendMessageDto: any): string {
    console.log(sendMessageDto);

    return 'Hello world!';
  }
}
