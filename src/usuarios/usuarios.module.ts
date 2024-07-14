import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { HttpModule } from '@nestjs/axios';
import { RedisProvider } from 'shared/providers/redis';

@Module({
  imports: [
    HttpModule.register({
      headers: {Authorization: ''},
    })
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService, RedisProvider],
})
export class UsuariosModule {}
