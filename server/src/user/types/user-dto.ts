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
}
