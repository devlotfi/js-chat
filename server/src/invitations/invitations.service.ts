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
}
