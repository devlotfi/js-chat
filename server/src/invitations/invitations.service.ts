import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { InvitationDTO } from './types/invitation-dto';

@Injectable()
export class InvitationsService {
  public constructor(private readonly databaseService: DatabaseService) {}

  public async sentInvitations(userId: string): Promise<InvitationDTO[]> {
    const invitations = await this.databaseService.invitation.findMany({
      where: {
        fromUserId: userId,
      },
      select: {
        id: true,
        createdAt: true,
        fromUser: {
          select: {
            id: true,
            username: true,
            profilePicture: true,
          },
        },
        toUser: {
          select: {
            id: true,
            username: true,
            profilePicture: true,
          },
        },
      },
    });
    return invitations;
  }

  public async recievedInvitations(userId: string): Promise<InvitationDTO[]> {
    const invitations = await this.databaseService.invitation.findMany({
      where: {
        toUserId: userId,
      },
      select: {
        id: true,
        createdAt: true,
        fromUser: {
          select: {
            id: true,
            username: true,
            profilePicture: true,
          },
        },
        toUser: {
          select: {
            id: true,
            username: true,
            profilePicture: true,
          },
        },
      },
    });
    return invitations;
  }

  public async sendInvitation(
    destinationUser: string,
    userId: string,
  ): Promise<InvitationDTO> {
    const invitation = await this.databaseService.invitation.create({
      data: {
        fromUserId: userId,
        toUserId: destinationUser,
      },
      select: {
        id: true,
        createdAt: true,
        fromUser: {
          select: {
            id: true,
            username: true,
            profilePicture: true,
          },
        },
        toUser: {
          select: {
            id: true,
            username: true,
            profilePicture: true,
          },
        },
      },
    });

    return invitation;
  }

  public async acceptInvitation(
    invitationId: string,
    userId: string,
  ): Promise<void> {
    return await this.databaseService.$transaction(async (prisma) => {
      const invitation = await prisma.invitation.findUniqueOrThrow({
        where: {
          id: invitationId,
          toUserId: userId,
        },
      });

      await prisma.conversation.create({
        data: {
          conversationUsers: {
            createMany: {
              data: [
                {
                  userId: invitation.toUserId,
                },
                {
                  userId: invitation.fromUserId,
                },
              ],
            },
          },
        },
      });

      await prisma.invitation.delete({
        where: {
          id: invitationId,
        },
      });
    });
  }

  public async deleteInvitation(
    invitationId: string,
    userId: string,
  ): Promise<void> {
    await this.databaseService.invitation.delete({
      where: {
        id: invitationId,
        OR: [
          {
            fromUserId: userId,
          },
          {
            toUserId: userId,
          },
        ],
      },
    });
  }
}
