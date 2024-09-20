import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { MessageDTO } from './dto/message-dto';

@Injectable()
export class MessagesService {
  public constructor(private readonly databaseService: DatabaseService) {}

  public async messages(
    conversationId: string,
    userId: string,
  ): Promise<MessageDTO[]> {
    console.log(conversationId, userId);

    // chacking if the user is part of the conversation
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
        createdAt: 'desc',
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
}
