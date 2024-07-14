import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { RedisProvider } from '../shared/providers/redis';

@Injectable()
export class AppService {
  constructor() {}
  healthCheck() {
    return 'SERVER HELTHY';
  }
}
