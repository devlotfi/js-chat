import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { MessagesParams } from './dto/messages-params';
import { MessageDTO } from './dto/message-dto';
import { ApiExcpetion } from 'src/shared/api-exception';
import { SendMessageParams } from './dto/send-message-params';
import { SendMessageDTO } from './dto/send-message-dto';

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
    @CurrentUser() userId: string,
  ): Promise<MessageDTO[]> {
    return await this.messagesService.messages(
      messageParams.conversationId,
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
    @Param() sendMessageParams: SendMessageParams,
    @Body() sendMessageDto: SendMessageDTO,
    @CurrentUser() userId: string,
  ): Promise<MessageDTO> {
    return await this.messagesService.sendMessage(
      sendMessageDto,
      sendMessageParams.conversationId,
      userId,
    );
  }
}
