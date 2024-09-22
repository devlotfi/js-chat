import { ApiProperty } from '@nestjs/swagger';

export class SendMessageDTO {
  @ApiProperty()
  public text: string;
}
