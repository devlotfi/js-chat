import { HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { SignInDTO } from './dto/sign-in-dto';
import { SignInResponseDTO } from './dto/sign-in-response-dto';
import { GoogleOAuth2ClientService } from './google-oauth2-client.service';
import { ApiExcpetion } from 'src/shared/api-exception';
import { ErrorMessages } from 'src/shared/error-messages';
import { TokenService } from './token.service';
import { Response } from 'express';
import { Constants } from 'src/shared/constants';
import { TokenPayload } from 'google-auth-library';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  public constructor(
    private readonly databaseService: DatabaseService,
    private readonly googleOAuth2ClientService: GoogleOAuth2ClientService,
    private readonly tokenService: TokenService,
  ) {}

  private async authenthicate(user: User, res: Response) {
    const accessToken = await this.tokenService.generateAccessToken(user.id);
    const refreshToken = await this.tokenService.generateRefreshToken(user.id);

    res.cookie(Constants.REFRESH_TOKEN_COOKIE_KEY, refreshToken);

    return new SignInResponseDTO(user, accessToken);
  }

  public async signIn(
    signInDto: SignInDTO,
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
    } catch (error) {
      console.log(error);
      throw new ApiExcpetion(
        ErrorMessages.INVALID_OAUTH_TOKEN,
        HttpStatus.BAD_REQUEST,
      );
    }

    const existingUser = await this.databaseService.user.findUnique({
      where: {
        id: userData.sub,
      },
    });
    if (existingUser) {
      return this.authenthicate(existingUser, res);
    }

    const user = await this.databaseService.user.create({
      data: {
        id: userData.sub,
        username: userData.name,
        email: userData.email,
        profilePicture: userData.picture,
      },
    });

    return this.authenthicate(user, res);
  }
}
