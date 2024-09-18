import { ApiProperty } from '@nestjs/swagger';
import { UserType } from 'src/user/types/user';

export class SignInResponseDTO {
  @ApiProperty({ type: () => UserType })
  public user: UserType;

  @ApiProperty()
  public accessToken: string;
}
