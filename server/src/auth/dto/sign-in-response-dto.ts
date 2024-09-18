import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { UserDTO } from 'src/user/types/user-dto';

export class SignInResponseDTO {
  @ApiProperty({ type: () => UserDTO })
  public user: UserDTO;

  @ApiProperty()
  public accessToken: string;

  public constructor(user: User, accessToken: string) {
    this.user = new UserDTO(user);
    this.accessToken = accessToken;
  }
}
