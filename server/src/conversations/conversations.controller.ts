import { Controller, Get, UseGuards } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { ConversationDTO } from './dto/conversation-dto';

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
}
