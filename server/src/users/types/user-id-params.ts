import { ApiProperty } from '@nestjs/swagger';

export class UserIdParams {
  @ApiProperty()
  public userId: string;
}
