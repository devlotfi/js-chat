import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class UserPublicDTO {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public username: string;

  @ApiProperty()
  public profilePicture: string;

  public constructor(user: User) {
    this.id = user.id;
    this.username = user.username;
    this.profilePicture = user.profilePicture;
  }
}
