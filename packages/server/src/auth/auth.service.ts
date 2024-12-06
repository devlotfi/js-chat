import { HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { SignInDTO } from './types/sign-in-dto';
import { SignInResponseDTO } from './types/sign-in-response-dto';
import { GoogleOAuth2ClientService } from './google-oauth2-client.service';
import { ApiExcpetion } from 'src/shared/api-exception';
import { ErrorMessages } from 'src/shared/error-messages';
import { TokenService } from './token.service';
import { Request, Response } from 'express';
import { Constants } from 'src/shared/constants';
import { TokenPayload } from 'google-auth-library';
import { User } from '@prisma/client';
import * as Cookies from 'cookies';
import { SignInRefreshTokenResponseDTO } from './types/sign-in-refresh-token-response-dto';
import { JWTTokenPayload } from './types/token-payload';

@Injectable()
export class AuthService {
  public constructor(
    private readonly databaseService: DatabaseService,
    private readonly googleOAuth2ClientService: GoogleOAuth2ClientService,
    private readonly tokenService: TokenService,
  ) {}

  private async authenthicate(user: User, req: Request, res: Response) {
    const accessToken = await this.tokenService.generateAccessToken(user.id);
    const refreshToken = await this.tokenService.generateRefreshToken(user.id);

    const cookies = new Cookies(req, res);
    cookies.set(Constants.REFRESH_TOKEN_COOKIE_KEY, refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
    });

    return new SignInResponseDTO(user, accessToken);
  }

  public async signIn(
    signInDto: SignInDTO,
    req: Request,
    res: Response,
  ): Promise<SignInResponseDTO> {
    let userData: TokenPayload;
    try {
      const { tokens } = await this.googleOAuth2ClientService.client.getToken(
        signInDto.code,
      );
      const loginTicket =
        await this.googleOAuth2ClientService.client.verifyIdToken({
          idToken: tokens.id_token,
        });
      userData = loginTicket.getPayload();
    } catch {
      throw new ApiExcpetion(
        ErrorMessages.INVALID_OAUTH_TOKEN,
        HttpStatus.BAD_REQUEST,
      );
    }

    const existingUser = await this.databaseService.user.findUnique({
      where: {
        id: userData.sub,
      },
      select: {
        id: true,
        username: true,
        profilePicture: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (existingUser) {
      return this.authenthicate(existingUser, req, res);
    }

    const user = await this.databaseService.user.create({
      data: {
        id: userData.sub,
        username: userData.name,
        email: userData.email,
        profilePicture: userData.picture,
      },
      select: {
        id: true,
        username: true,
        profilePicture: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return this.authenthicate(user, req, res);
  }

  public async signInRefreshToken(
    req: Request,
    res: Response,
  ): Promise<SignInRefreshTokenResponseDTO> {
    const cookies = new Cookies(req, res);
    const refreshToken = cookies.get(Constants.REFRESH_TOKEN_COOKIE_KEY);
    if (!refreshToken) {
      throw new ApiExcpetion(ErrorMessages.NO_TOKEN, HttpStatus.BAD_REQUEST);
    }

    let payload: JWTTokenPayload;
    try {
      payload = await this.tokenService.verifyRefreshToken(refreshToken);
    } catch {
      throw new ApiExcpetion(
        ErrorMessages.INVALID_TOKEN,
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.databaseService.user.findUniqueOrThrow({
      where: {
        id: payload.userId,
      },
      select: {
        id: true,
        username: true,
        profilePicture: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    const accessToken = await this.tokenService.generateAccessToken(user.id);

    return new SignInRefreshTokenResponseDTO(user, accessToken);
  }

  public async signOut(req: Request, res: Response): Promise<void> {
    const cookies = new Cookies(req, res);
    cookies.set(Constants.REFRESH_TOKEN_COOKIE_KEY, null);
  }
}
