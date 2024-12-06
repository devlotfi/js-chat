import { ApiProperty } from '@nestjs/swagger';

export class WsAuthPayload {
  @ApiProperty()
  public accessToken: string;
}
