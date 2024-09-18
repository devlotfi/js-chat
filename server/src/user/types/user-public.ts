import { ApiProperty } from '@nestjs/swagger';

export class UserPublicType {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public username: string;

  @ApiProperty()
  public profilePicture: string;
}
