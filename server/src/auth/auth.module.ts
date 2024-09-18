import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { GoogleOAuth2ClientService } from './google-oauth2-client.service';
import { TokenService } from './token.service';

@Module({
  imports: [ConfigModule, JwtModule.register({})],
  providers: [AuthService, GoogleOAuth2ClientService, TokenService],
  controllers: [AuthController],
})
export class AuthModule {}
