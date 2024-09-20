import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  public constructor() {
    super({
      log: ['query'],
    });
  }

  private readonly logger = new Logger(DatabaseService.name);

  public async onModuleInit() {
    await this.$connect();
    this.logger.debug('Connected to database');
  }

  public async onModuleDestroy() {
    await this.$disconnect();
    this.logger.debug('Disconnected from database');
  }
}
