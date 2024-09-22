import { Injectable } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { WsAuthPayload } from 'src/auth/dto/ws-auth-dto';
import { TokenService } from 'src/auth/token.service';
import { RedisPrefixes } from 'src/redis/redis-prefixes';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class WsSessionService
  implements OnGatewayConnection, OnGatewayDisconnect
{
  public constructor(
    private readonly redisService: RedisService,
    private readonly tokenService: TokenService,
  ) {}

  public async handleConnection(client: Socket) {
    console.log('connect', client.handshake.auth);
    try {
      const { accessToken } = client.handshake.auth as WsAuthPayload;
      const { userId } = await this.tokenService.verifyAccessToken(accessToken);

      let userConnections = await this.redisService.client.get(
        RedisPrefixes.USER_CONNECTIONS(userId),
      );
      let connectionsArray: string[];
      if (userConnections) {
        connectionsArray = JSON.parse(userConnections);
        connectionsArray.push(client.id);
      } else {
        connectionsArray = [client.id];
      }
      userConnections = JSON.stringify(connectionsArray);
      await this.redisService.client.set(
        RedisPrefixes.USER_CONNECTIONS(userId),
        userConnections,
        'EX',
        3600,
      );
    } catch {
      client.disconnect(true);
    }
  }

  public async handleDisconnect(client: Socket) {
    console.log('disconnect', client.handshake.auth);

    try {
      const { accessToken } = client.handshake.auth as WsAuthPayload;
      const { userId } = await this.tokenService.decodeAccessToken(accessToken);

      let userConnections = await this.redisService.client.get(
        RedisPrefixes.USER_CONNECTIONS(userId),
      );
      let connectionsArray: string[];
      if (userConnections) {
        connectionsArray = JSON.parse(userConnections);
        connectionsArray = connectionsArray.filter(
          (connection) => connection !== client.id,
        );
      } else {
        return;
      }
      userConnections = JSON.stringify(connectionsArray);
      await this.redisService.client.set(
        RedisPrefixes.USER_CONNECTIONS(userId),
        userConnections,
        'EX',
        3600,
      );
    } catch (error) {
      console.log(error);

      console.log('ivalid disconnect token');
    }
  }
}
