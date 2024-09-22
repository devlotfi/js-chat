import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { ConversationDTO } from './dto/conversation-dto';
import { ConversationDetailsParams } from './dto/conversation-details-params';
import { ApiExcpetion } from 'src/shared/api-exception';

@Controller('conversations')
export class ConversationsController {
  public constructor(
    private readonly conversationsService: ConversationsService,
  ) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    type: [ConversationDTO],
  })
  public async conversations(
    @CurrentUser() userId: string,
  ): Promise<ConversationDTO[]> {
    return await this.conversationsService.conversations(userId);
  }

  @Get(':conversationId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    type: () => ConversationDTO,
  })
  @ApiNotFoundResponse({
    type: () => ApiExcpetion,
  })
  public async conversationDetails(
    @Param() conversationDetailsParams: ConversationDetailsParams,
    @CurrentUser() userId: string,
  ): Promise<ConversationDTO> {
    return await this.conversationsService.conversationDetails(
      conversationDetailsParams.conversationId,
      userId,
    );
  }
}
