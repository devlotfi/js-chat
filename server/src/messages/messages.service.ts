import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { MessageDTO } from './dto/message-dto';
import { SendMessageDTO } from './dto/send-message-dto';

@Injectable()
export class MessagesService {
  public constructor(private readonly databaseService: DatabaseService) {}

  public async messages(
    conversationId: string,
    userId: string,
  ): Promise<MessageDTO[]> {
    await this.databaseService.conversationUser.findFirstOrThrow({
      where: {
        conversationId,
        userId,
      },
    });

    const messages = await this.databaseService.message.findMany({
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
  }

  public async sendMessage(
    sendMessageDto: SendMessageDTO,
    conversationId: string,
    userId: string,
  ): Promise<MessageDTO> {
    const conversation =
      await this.databaseService.conversation.findUniqueOrThrow({
        where: {
          id: conversationId,
          conversationUsers: {
            some: {
              userId,
            },
          },
        },
        select: {
          conversationUsers: {
            where: {
              NOT: {
                userId: {
                  equals: userId,
                },
              },
            },
          },
        },
      });

    const message = await this.databaseService.message.create({
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

    return message;
  }
}
