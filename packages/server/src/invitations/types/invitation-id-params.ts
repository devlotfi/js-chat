import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class InvitationIdParams {
  @ApiProperty()
  @IsUUID()
  public invitationId: string;
}
