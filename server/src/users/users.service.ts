import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { UsersQuery } from './types/users-query';
import { UserPublicDTO } from './types/user-public-dto';
import { UserLinkStatusDTO } from './types/user-link-status-dto';

@Injectable()
export class UsersService {
  public constructor(private readonly databaserService: DatabaseService) {}

  public async users(
    usersQuery: UsersQuery,
    userId: string,
  ): Promise<UserPublicDTO[]> {
    const users = await this.databaserService.user.findMany({
      cursor: usersQuery.cursor
        ? {
            id: usersQuery.cursor,
          }
        : undefined,
      where: {
        NOT: {
          id: {
            equals: userId,
          },
        },
        username: {
          contains: usersQuery.search,
          mode: 'insensitive',
        },
      },
      select: {
        id: true,
        username: true,
        profilePicture: true,
      },
      skip: 0,
      take: 10,
    });
    return users;
  }

  public async userLinkStatus(
    currentUserId: string,
    otherId: string,
  ): Promise<UserLinkStatusDTO> {
    const [userToUserConversation, sentInvitation, recievedInvitation] =
      await Promise.all([
        this.userConversationExists(currentUserId, otherId),
        this.invitationSentStatus(currentUserId, otherId),
        this.invitationRecievedStatus(currentUserId, otherId),
      ]);

    let conversation = false;
    let invitationSent = false;
    let invitationRecieved = false;

    if (userToUserConversation) conversation = true;
    if (sentInvitation) invitationSent = true;
    if (recievedInvitation) invitationRecieved = true;

    return {
      conversation,
      invitationSent,
      invitationRecieved,
    };
  }

  public async userConversationExists(user1Id: string, user2Id: string) {
    const userToUserConversation =
      await this.databaserService.conversation.findFirst({
        where: {
          conversationUsers: {
            none: {
              userId: {
                notIn: [user1Id, user2Id],
              },
            },
          },
        },
      });
    return userToUserConversation;
  }

  public async invitationSentStatus(currentUserId: string, toUserId: string) {
    const sentInvitation = await this.databaserService.invitation.findUnique({
      where: {
        fromUserId_toUserId: {
          fromUserId: currentUserId,
          toUserId: toUserId,
        },
      },
    });
    return sentInvitation;
  }

  public async invitationRecievedStatus(
    currentUserId: string,
    fromUserId: string,
  ) {
    const sentInvitation = await this.databaserService.invitation.findUnique({
      where: {
        fromUserId_toUserId: {
          fromUserId: fromUserId,
          toUserId: currentUserId,
        },
      },
    });
    return sentInvitation;
  }
}
