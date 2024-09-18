import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class UserDTO {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public username: string;

  @ApiProperty()
  public email: string;

  @ApiProperty()
  public profilePicture: string;

  public constructor(user: User) {
    this.id = this.id;
    this.username = user.username;
    this.email = user.email;
    this.profilePicture = user.profilePicture;
  }
}
