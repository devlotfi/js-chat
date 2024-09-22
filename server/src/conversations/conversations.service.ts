import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { ConversationDTO } from './dto/conversation-dto';

@Injectable()
export class ConversationsService {
  public constructor(private readonly databaseService: DatabaseService) {}

  public async conversations(userId: string): Promise<ConversationDTO[]> {
    const conversations = await this.databaseService.conversation.findMany({
      where: {
        conversationUsers: {
          some: {
            userId,
          },
        },
      },
      select: {
        id: true,
        createdAt: true,
        conversationUsers: {
          where: {
            NOT: {
              userId: {
                equals: userId,
              },
            },
          },
          select: {
            user: {
              select: {
                id: true,
                username: true,
                profilePicture: true,
              },
            },
          },
        },
      },
    });
    return conversations;
  }

  public async conversationDetails(conversationId: string, userId: string) {
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
          id: true,
          createdAt: true,
          conversationUsers: {
            where: {
              NOT: {
                userId: {
                  equals: userId,
                },
              },
            },
            select: {
              user: {
                select: {
                  id: true,
                  username: true,
                  profilePicture: true,
                },
              },
            },
          },
        },
      });
    return conversation;
  }
}
