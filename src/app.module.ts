import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
import { ConfigModule } from '@nestjs/config';
import { RedisProvider } from '../shared/providers/redis';
import { UsuariosModule } from './usuarios/usuarios.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: () => ({
        store: async () =>
          (await redisStore({
            socket: {
              host: process.env.REDIS_HOST,
              port: parseInt(process.env.REDIS_PORT),
            },
            password: process.env.REDIS_PASSWORD,
            username: '',
          })) as any as CacheStore,
      }),
    }),
    UsuariosModule,
  ],

  controllers: [AppController],
  providers: [AppService, RedisProvider],
})
export class AppModule {}
