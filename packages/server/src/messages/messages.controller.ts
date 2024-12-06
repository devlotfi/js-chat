import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { MessagesParams } from './types/messages-params';
import { MessageDTO } from './types/message-dto';
import { ApiExcpetion } from 'src/shared/api-exception';
import { SendMessageDTO } from './types/send-message-dto';
import { ConversationIdParams } from 'src/conversations/types/conversation-id-params';
import { MessagesQuery } from './types/messages-query';

@Controller('messages')
export class MessagesController {
  public constructor(private readonly messagesService: MessagesService) {}

  @Get(':conversationId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    type: [MessageDTO],
  })
  @ApiNotFoundResponse({
    type: () => ApiExcpetion,
  })
  public async messages(
    @Param() messageParams: MessagesParams,
    @Query() messageQuery: MessagesQuery,
    @CurrentUser() userId: string,
  ): Promise<MessageDTO[]> {
    return await this.messagesService.messages(
      messageParams.conversationId,
      messageQuery.cursor,
      userId,
    );
  }

  @Post(':conversationId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    type: () => MessageDTO,
  })
  @ApiNotFoundResponse({
    type: () => ApiExcpetion,
  })
  public async sendMessage(
    @Param() conversationIdParams: ConversationIdParams,
    @Body() sendMessageDto: SendMessageDTO,
    @CurrentUser() userId: string,
  ): Promise<MessageDTO> {
    return await this.messagesService.sendMessage(
      sendMessageDto,
      conversationIdParams.conversationId,
      userId,
    );
  }
}
