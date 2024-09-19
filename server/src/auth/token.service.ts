import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { EnvDefinition } from 'src/shared/env-definition';
import { JWTTokenPayload } from 'src/shared/token-payload';

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

  public async verifyAccessToken(
    accessToken: string,
  ): Promise<JWTTokenPayload> {
    try {
      const payload = await this.jwtService.verifyAsync<JWTTokenPayload>(
        accessToken,
        {
          secret: this.configService.getOrThrow<string>(
            'JWT_ACCESS_TOKEN_SECRET',
          ),
        },
      );
      return payload;
    } catch {
      throw new Error('Invalid access token');
    }
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

  public async verifyRefreshToken(
    refreshToken: string,
  ): Promise<JWTTokenPayload> {
    try {
      const payload = await this.jwtService.verifyAsync<JWTTokenPayload>(
        refreshToken,
        {
          secret: this.configService.getOrThrow<string>(
            'JWT_ACCESS_TOKEN_SECRET',
          ),
        },
      );
      return payload;
    } catch {
      throw new Error('Invalid refresh token');
    }
  }
}
