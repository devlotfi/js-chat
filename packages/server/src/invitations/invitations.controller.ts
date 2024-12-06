import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { InvitationsService } from './invitations.service';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { InvitationDTO } from './types/invitation-dto';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { UserIdParams } from 'src/users/types/user-id-params';
import { InvitationIdParams } from './types/invitation-id-params';

@Controller('invitations')
export class InvitationsController {
  public constructor(private readonly invitationsService: InvitationsService) {}

  @Get('/sent')
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

  @Get('/recieved')
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

  @Post(':userId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    type: () => InvitationDTO,
  })
  public async sendInvitation(
    @Param() userIdParams: UserIdParams,
    @CurrentUser() userId: string,
  ): Promise<InvitationDTO> {
    return await this.invitationsService.sendInvitation(
      userIdParams.userId,
      userId,
    );
  }

  @Patch(':invitationId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  public async acceptInvitation(
    @Param() invitationIdParams: InvitationIdParams,
    @CurrentUser() userId: string,
  ): Promise<void> {
    await this.invitationsService.acceptInvitation(
      invitationIdParams.invitationId,
      userId,
    );
  }

  @Delete(':invitationId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  public async deleteInvitation(
    @Param() invitationIdParams: InvitationIdParams,
    @CurrentUser() userId: string,
  ): Promise<void> {
    await this.invitationsService.deleteInvitation(
      invitationIdParams.invitationId,
      userId,
    );
  }
}
