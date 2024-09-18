import { Body, Controller, Post } from '@nestjs/common';
import { SignInDTO } from './dto/sign-in-dto';
import { AuthService } from './auth.service';
import { ApiBadRequestResponse, ApiOkResponse } from '@nestjs/swagger';
import { SignInResponseDTO } from './dto/sign-in-response-dto';
import { ApiExcpetion } from 'src/shared/api-exception';

@Controller('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post('/sign-in')
  @ApiOkResponse({
    type: () => SignInResponseDTO,
  })
  @ApiBadRequestResponse({
    type: () => ApiExcpetion,
  })
  public async signIn(
    @Body() signInDto: SignInDTO,
  ): Promise<SignInResponseDTO> {
    return await this.authService.signIn(signInDto);
  }
}
