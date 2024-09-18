import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { SignInDTO } from './dto/sign-in-dto';

@Injectable()
export class AuthService {
  public constructor(private readonly databaseService: DatabaseService) {}

  public async signIn(signInDto: SignInDTO) {}
}
