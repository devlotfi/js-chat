import { OnGatewayConnection, WebSocketGateway } from '@nestjs/websockets';
import { WsSessionService } from './ws-session.service';
import { Socket } from 'socket.io';

@WebSocketGateway(5000, {
  transports: ['websocket'],
  cors: {
    origin: '*',
  },
})
export class WsSessionGateway implements OnGatewayConnection {
  public constructor(private readonly wsSessionService: WsSessionService) {}

  public async handleConnection(client: Socket) {
    this.wsSessionService.handleConnection(client);
  }
}
