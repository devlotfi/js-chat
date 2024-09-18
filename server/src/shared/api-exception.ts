import { ApiProperty } from '@nestjs/swagger';
import { ErrorMessages } from './error-messages';
import { HttpException, HttpStatus } from '@nestjs/common';

export class ApiExcpetion extends HttpException {
  @ApiProperty({ enum: ErrorMessages })
  public message: string;

  @ApiProperty()
  public statusCode: number;

  public constructor(message: ErrorMessages, status: HttpStatus) {
    super(message, status);
  }
}
