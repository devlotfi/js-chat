import { Injectable } from '@nestjs/common';
import { OnGatewayConnection } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { WsAuthPayload } from 'src/auth/types/ws-auth-dto';
import { TokenService } from 'src/auth/token.service';
import { DatabaseService } from 'src/database/database.service';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class WsSessionService implements OnGatewayConnection {
  public constructor(
    private readonly redisService: RedisService,
    private readonly databaseService: DatabaseService,
    private readonly tokenService: TokenService,
  ) {}

  public async handleConnection(client: Socket) {
    console.log('connect', client.handshake.auth);
    try {
      const { accessToken } = client.handshake.auth as WsAuthPayload;
      const { userId } = await this.tokenService.verifyAccessToken(accessToken);

      const userConversations =
        await this.databaseService.conversationUser.findMany({
          where: {
            userId,
          },
        });
      const conversationIds = userConversations.map(
        (conversation) => conversation.conversationId,
      );
      client.join([...conversationIds, userId]);
    } catch {
      client.disconnect(true);
    }
  }
}
