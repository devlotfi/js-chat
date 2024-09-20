import { ApiProperty } from '@nestjs/swagger';
import { Message } from '@prisma/client';
import { UserPublicDTO } from 'src/user/types/user-public-dto';

export class MessageDTO implements Partial<Message> {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public text: string;

  @ApiProperty()
  public isDeleted: boolean;

  @ApiProperty({ type: () => Date })
  public createdAt: Date;

  @ApiProperty({ type: () => UserPublicDTO })
  public user: UserPublicDTO;
}
