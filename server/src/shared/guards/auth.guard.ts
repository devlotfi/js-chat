import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { TokenService } from 'src/auth/token.service';
import { JWTTokenPayload } from '../token-payload';

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(private readonly tokenService: TokenService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authorization = req.headers.authorization;
    if (!authorization) {
      return false;
    }

    const accessToken = authorization.split(' ')[1];
    if (!accessToken) {
      return false;
    }

    let payload: JWTTokenPayload;
    try {
      payload = await this.tokenService.verifyAccessToken(accessToken);
    } catch {
      return false;
    }

    console.log(payload);

    req.userId = payload.userId;

    return true;
  }
}
