import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisProvider extends Redis{
     constructor() {
          super({
              host: process.env.REDIS_HOST,
              port: parseInt(process.env.REDIS_PORT),
              password: process.env.REDIS_PASSWORD,
            });

        }
}
