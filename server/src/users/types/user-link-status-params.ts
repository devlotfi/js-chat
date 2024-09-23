import { ApiProperty } from '@nestjs/swagger';

export class UserLinkStatusParams {
  @ApiProperty()
  public userId: string;
}
