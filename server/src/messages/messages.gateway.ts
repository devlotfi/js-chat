import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

@WebSocketGateway(3001, {
  transports: ['websocket'],
  cors: {
    origin: '*',
  },
})
export class MessagesGateway implements OnGatewayConnection {
  public handleConnection(client: any, ...args: any[]) {}

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
}
