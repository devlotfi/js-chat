import { ApiProperty } from '@nestjs/swagger';
import { SocketIOMesages } from './socket-io-messages';

export class SocketIOAPIDefinition {
  @ApiProperty({ enum: SocketIOMesages })
  public messages: SocketIOMesages;
}
