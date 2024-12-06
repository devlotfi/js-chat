import { ApiProperty } from '@nestjs/swagger';

export class UsersQuery {
  @ApiProperty()
  public search: string;

  @ApiProperty()
  public cursor: string;
}
