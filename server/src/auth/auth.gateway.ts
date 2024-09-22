import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

@WebSocketGateway(5000, {
  transports: ['websocket'],
  cors: {
    origin: '*',
  },
})
export class AuthGateway implements OnGatewayConnection {
  public handleConnection(client: any, ...args: any[]) {
    console.log('lol');
    client.disconnect(true);
    setTimeout(() => {
      client.emit('test', {});
    }, 5000);
  }

  handleDisconnect(client: any) {
    console.log('disconned');
  }

  @SubscribeMessage('messagelol')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
}
