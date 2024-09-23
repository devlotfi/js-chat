import { ApiProperty } from '@nestjs/swagger';
import { UserPublicDTO } from 'src/users/types/user-public-dto';

export class ConversationUserDTO {
  @ApiProperty({ type: () => UserPublicDTO })
  public user: UserPublicDTO;
}
