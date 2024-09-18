import { ApiProperty } from '@nestjs/swagger';

export class SignInDTO {
  @ApiProperty()
  public idToken: string;
}
