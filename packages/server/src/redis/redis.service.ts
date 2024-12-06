import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';
import { EnvDefinition } from 'src/shared/env-definition';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);

  public constructor(
    private readonly configService: ConfigService<EnvDefinition>,
  ) {}

  private readonly _client: Redis = new Redis({
    lazyConnect: true,
    host: this.configService.getOrThrow<string>('REDIS_HOST'),
    port: this.configService.getOrThrow<number>('REDIS_PORT'),
    password: this.configService.getOrThrow<string>('REDIS_PASSWORD'),
  });
  public get client(): Redis {
    return this._client;
  }

  public async onModuleInit() {
    await this._client.connect();
    this.logger.debug('Connected to redis');
  }

  public async onModuleDestroy() {
    await this._client.disconnect();
    this.logger.debug('Disconnected from redis');
  }
}
