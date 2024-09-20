import { ApiProperty } from '@nestjs/swagger';
import { Invitation } from '@prisma/client';
import { UserPublicDTO } from 'src/user/types/user-public-dto';

export class InvitationDTO implements Partial<Invitation> {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public createdAt: Date;

  @ApiProperty()
  public fromUser: UserPublicDTO;

  @ApiProperty()
  public toUser: UserPublicDTO;
}
