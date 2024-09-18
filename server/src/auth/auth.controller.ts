import { Body, Controller, Post } from '@nestjs/common';
import { SignInDTO } from './dto/sign-in-dto';
import { AuthService } from './auth.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { SignInResponseDTO } from './dto/sign-in-response-dto';

@Controller('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post('/sign-in')
  @ApiOkResponse({
    type: () => SignInResponseDTO,
  })
  public async signIn(@Body() signInDto: SignInDTO) {
    return await this.authService.signIn(signInDto);
  }
}
