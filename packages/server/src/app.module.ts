import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { ConversationsModule } from './conversations/conversations.module';
import { MessagesModule } from './messages/messages.module';
import { InvitationsModule } from './invitations/invitations.module';
import { RedisModule } from './redis/redis.module';
import { WsSessionModule } from './ws-session/ws-session.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    AuthModule,
    ConversationsModule,
    MessagesModule,
    InvitationsModule,
    RedisModule,
    WsSessionModule,
    UsersModule,
  ],
})
export class AppModule {}
