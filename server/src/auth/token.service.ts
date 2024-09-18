import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { EnvDefinition } from 'src/shared/env-definition';

@Injectable()
export class TokenService {
  public constructor(
    private readonly configService: ConfigService<EnvDefinition>,
    private readonly jwtService: JwtService,
  ) {}

  public async generateAccessToken(userId: string) {
    const accessToken = await this.jwtService.signAsync(
      { userId },
      {
        secret: this.configService.getOrThrow<string>(
          'JWT_ACCESS_TOKEN_SECRET',
        ),
        expiresIn: '10min',
      },
    );
    return accessToken;
  }

  public async generateRefreshToken(userId: string) {
    const accessToken = await this.jwtService.signAsync(
      { userId },
      {
        secret: this.configService.getOrThrow<string>(
          'JWT_REFRESH_TOKEN_SECRET',
        ),
        expiresIn: '30d',
      },
    );
    return accessToken;
  }
}
