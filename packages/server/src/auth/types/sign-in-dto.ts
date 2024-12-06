import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignInDTO {
  @ApiProperty()
  @IsString()
  public code: string;
}
