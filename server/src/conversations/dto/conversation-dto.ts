import { ApiProperty } from '@nestjs/swagger';
import { Conversation } from '@prisma/client';
import { ConversationUserDTO } from './conversation-user-dto';

export class ConversationDTO implements Partial<Conversation> {
  @ApiProperty()
  public id: string;

  @ApiProperty({ type: () => Date })
  public createdAt: Date;

  @ApiProperty({ type: [ConversationUserDTO] })
  public conversationUsers: ConversationUserDTO[];
}
