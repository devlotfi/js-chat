import { ApiProperty } from '@nestjs/swagger';

export class UserLinkStatusDTO {
  @ApiProperty()
  public conversation: boolean;

  @ApiProperty()
  public invitationSent: boolean;

  @ApiProperty()
  public invitationRecieved: boolean;
}
