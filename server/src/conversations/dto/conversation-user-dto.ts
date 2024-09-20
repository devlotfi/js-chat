import { ApiProperty } from '@nestjs/swagger';
import { UserPublicDTO } from 'src/user/types/user-public-dto';

export class ConversationUserDTO {
  @ApiProperty({ type: () => UserPublicDTO })
  public user: UserPublicDTO;
}
