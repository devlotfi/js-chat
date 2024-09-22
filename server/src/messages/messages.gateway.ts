import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

@WebSocketGateway(5000, {
  transports: ['websocket'],
  cors: {
    origin: '*',
  },
})
export class MessagesGateway {
  @SubscribeMessage('SendMessageEvent.eventType')
  public handleMessage(@MessageBody() sendMessageDto: any): string {
    console.log(sendMessageDto);

    return 'Hello world!';
  }
}
