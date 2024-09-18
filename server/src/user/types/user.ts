import { ApiProperty } from '@nestjs/swagger';

export class UserType {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public username: string;

  @ApiProperty()
  public email: string;

  @ApiProperty()
  public profilePicture: string;
}
