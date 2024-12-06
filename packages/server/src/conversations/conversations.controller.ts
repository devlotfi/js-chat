import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { ConversationDTO } from './types/conversation-dto';
import { ApiExcpetion } from 'src/shared/api-exception';
import { ConversationIdParams } from './types/conversation-id-params';

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
    @Param() conversationIdParams: ConversationIdParams,
    @CurrentUser() userId: string,
  ): Promise<ConversationDTO> {
    return await this.conversationsService.conversationDetails(
      conversationIdParams.conversationId,
      userId,
    );
  }

  @Delete(':conversationId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiNotFoundResponse({
    type: () => ApiExcpetion,
  })
  public async deleteConversation(
    @Param() conversationIdParams: ConversationIdParams,
    @CurrentUser() userId: string,
  ): Promise<void> {
    await this.conversationsService.deleteConversation(
      conversationIdParams.conversationId,
      userId,
    );
  }
}
