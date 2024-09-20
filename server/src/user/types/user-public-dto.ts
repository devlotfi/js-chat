import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class UserPublicDTO implements Partial<User> {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public username: string;

  @ApiProperty()
  public profilePicture: string;
}
