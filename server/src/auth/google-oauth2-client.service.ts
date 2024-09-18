import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import { EnvDefinition } from 'src/shared/env-definition';

@Injectable()
export class GoogleOAuth2ClientService {
  public constructor(
    private readonly configService: ConfigService<EnvDefinition>,
  ) {}

  private readonly _client = new OAuth2Client({
    clientId: this.configService.getOrThrow<string>('GOOGLE_OAUTH_CLIENT_ID'),
    clientSecret: this.configService.getOrThrow<string>(
      'GOOGLE_OAUTH_CLIENT_SECRET',
    ),
    redirectUri: 'http://localhost:5173',
  });
  public get client() {
    return this._client;
  }
}
