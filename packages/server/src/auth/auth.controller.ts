import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { SignInDTO } from './types/sign-in-dto';
import { AuthService } from './auth.service';
import { ApiBadRequestResponse, ApiOkResponse } from '@nestjs/swagger';
import { SignInResponseDTO } from './types/sign-in-response-dto';
import { ApiExcpetion } from 'src/shared/api-exception';
import { Request, Response } from 'express';
import { SignInRefreshTokenResponseDTO } from './types/sign-in-refresh-token-response-dto';
import { SignOutResponseDTO } from './types/sign-out-response-dto';

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
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<SignInResponseDTO> {
    return await this.authService.signIn(signInDto, req, res);
  }

  @Get('/sign-in/refresh-token')
  @ApiOkResponse({
    type: () => SignInRefreshTokenResponseDTO,
  })
  @ApiBadRequestResponse({
    type: () => ApiExcpetion,
  })
  public async signInRefreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<SignInRefreshTokenResponseDTO> {
    return await this.authService.signInRefreshToken(req, res);
  }

  @Post('/sign-out')
  @ApiOkResponse({
    type: () => SignOutResponseDTO,
  })
  public async signOut(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<SignOutResponseDTO> {
    return await this.authService.signOut(req, res);
  }
}
