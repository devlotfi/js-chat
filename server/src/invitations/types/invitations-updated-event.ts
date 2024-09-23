import { ApiProperty } from '@nestjs/swagger';
import { WsEmptyEventDefinition } from 'src/shared/ws-message-definition';

export class InvitationsUpdatedEvent extends WsEmptyEventDefinition {
  public static readonly eventType = 'INVITATIONS_UPDATED';

  @ApiProperty({ enum: [InvitationsUpdatedEvent.eventType] })
  public messageType: string;
}
