import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { MessagesParams } from './dto/messages-params';
import { MessageDTO } from './dto/message-dto';

@Controller('messages')
export class MessagesController {
  public constructor(private readonly messagesService: MessagesService) {}

  @Get(':conversationId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    type: [MessageDTO],
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
}
