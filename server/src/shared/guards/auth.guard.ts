import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JWTTokenPayload } from 'src/auth/types/token-payload';
import { TokenService } from 'src/auth/token.service';

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(private readonly tokenService: TokenService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    console.log(req.headers);

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
    } catch (error) {
      console.log(error);

      return false;
    }

    console.log(payload);

    req.userId = payload.userId;

    return true;
  }
}
