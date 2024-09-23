import { Controller, Get, UseGuards } from '@nestjs/common';
import { InvitationsService } from './invitations.service';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { InvitationDTO } from './types/invitation-dto';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';

@Controller('invitations')
export class InvitationsController {
  public constructor(private readonly invitationsService: InvitationsService) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    type: [InvitationDTO],
  })
  public async sentInvitations(
    @CurrentUser() userId: string,
  ): Promise<InvitationDTO[]> {
    return await this.invitationsService.sentInvitations(userId);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    type: [InvitationDTO],
  })
  public async recievedInvitations(
    @CurrentUser() userId: string,
  ): Promise<InvitationDTO[]> {
    return await this.invitationsService.recievedInvitations(userId);
  }
}
