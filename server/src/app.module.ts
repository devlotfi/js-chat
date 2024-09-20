import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConversationsModule } from './conversations/conversations.module';
import { MessagesModule } from './messages/messages.module';
import { InvitationsModule } from './invitations/invitations.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, AuthModule, UserModule, ConversationsModule, MessagesModule, InvitationsModule],
})
export class AppModule {}
