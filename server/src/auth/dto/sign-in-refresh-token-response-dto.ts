import { ApiProperty } from '@nestjs/swagger';
import { UserDTO } from 'src/user/types/user-dto';

export class SignInRefreshTokenResponseDTO {
  @ApiProperty({ type: () => UserDTO })
  public user: UserDTO;

  @ApiProperty()
  public accessToken: string;

  public constructor(user: UserDTO, accessToken: string) {
    this.user = user;
    this.accessToken = accessToken;
  }
}
