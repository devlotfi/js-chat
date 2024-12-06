import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class UserDTO implements Partial<User> {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public username: string;

  @ApiProperty()
  public email: string;

  @ApiProperty()
  public profilePicture: string;

  @ApiProperty({ type: () => Date })
  public createdAt: Date;

  @ApiProperty({ type: () => Date })
  public updatedAt: Date;

  public constructor(data: Omit<User, 'password'>) {
    this.id = data.id;
    this.email = data.email;
    this.username = data.username;
    this.profilePicture = data.profilePicture;
    this.createdAt = data.createdAt;
    this.updatedAt = data.createdAt;
  }
}
