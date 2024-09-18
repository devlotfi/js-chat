import { HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { SignInDTO } from './dto/sign-in-dto';
import { SignInResponseDTO } from './dto/sign-in-response-dto';
import { GoogleOAuth2ClientService } from './google-oauth2-client.service';
import { ApiExcpetion } from 'src/shared/api-exception';
import { ErrorMessages } from 'src/shared/error-messages';

@Injectable()
export class AuthService {
  public constructor(
    private readonly databaseService: DatabaseService,
    private readonly googleOAuth2ClientService: GoogleOAuth2ClientService,
  ) {}

  public async signIn(signInDto: SignInDTO): Promise<SignInResponseDTO> {
    try {
      const tokenInfo =
        await this.googleOAuth2ClientService.client.getTokenInfo(
          signInDto.idToken,
        );
      console.log('----------------------------------------', tokenInfo);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: any) {
      throw new ApiExcpetion(
        ErrorMessages.INVALID_OAUTH_TOKEN,
        HttpStatus.BAD_REQUEST,
      );
    }

    return {} as any;
  }
}
