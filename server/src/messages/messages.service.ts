import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { MessageDTO } from './types/message-dto';
import { SendMessageDTO } from './types/send-message-dto';
import { MessagesGateway } from './messages.gateway';
import { IncomingMessageEvent } from './types/incoming-message-event';

@Injectable()
export class MessagesService {
  public constructor(
    private readonly databaseService: DatabaseService,
    private readonly messagesGateway: MessagesGateway,
  ) {}

  public async messages(
    conversationId: string,
    cursor: string,
    userId: string,
  ): Promise<MessageDTO[]> {
    return await this.databaseService.$transaction(async (prisma) => {
      await prisma.conversationUser.findFirstOrThrow({
        where: {
          conversationId,
          userId,
        },
      });
      const messages = await prisma.message.findMany({
        take: 10,
        skip: 1,
        cursor: cursor
          ? {
              id: cursor,
            }
          : undefined,
        where: {
          conversationId,
        },
        orderBy: {
          createdAt: 'asc',
        },
        select: {
          id: true,
          text: true,
          isDeleted: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              username: true,
              profilePicture: true,
            },
          },
        },
      });
      return messages;
    });
  }

  public async sendMessage(
    sendMessageDto: SendMessageDTO,
    conversationId: string,
    userId: string,
  ): Promise<MessageDTO> {
    return await this.databaseService.$transaction(async (prisma) => {
      const conversation = await prisma.conversation.findUniqueOrThrow({
        where: {
          id: conversationId,
          conversationUsers: {
            some: {
              userId,
            },
          },
        },
      });
      const message = await prisma.message.create({
        data: {
          userId,
          conversationId,
          text: sendMessageDto.text,
        },
        select: {
          id: true,
          text: true,
          isDeleted: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              username: true,
              profilePicture: true,
            },
          },
        },
      });

      this.messagesGateway.server
        .to(conversation.id)
        .emit(IncomingMessageEvent.eventType, message);

      return message;
    });
  }
}
