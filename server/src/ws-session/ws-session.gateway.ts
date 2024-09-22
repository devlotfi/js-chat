import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
} from '@nestjs/websockets';
import { WsSessionService } from './ws-session.service';
import { Socket } from 'socket.io';

@WebSocketGateway(5000, {
  transports: ['websocket'],
  cors: {
    origin: '*',
  },
})
export class WsSessionGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  public constructor(private readonly wsSessionService: WsSessionService) {}

  public async handleConnection(client: Socket) {
    this.wsSessionService.handleConnection(client);
  }

  public async handleDisconnect(client: Socket) {
    this.wsSessionService.handleDisconnect(client);
  }
}
