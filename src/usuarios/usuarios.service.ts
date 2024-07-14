import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { HttpService } from '@nestjs/axios';
import { RedisProvider } from 'shared/providers/redis';
import { lastValueFrom } from 'rxjs';
import { json } from 'stream/consumers';

@Injectable()
export class UsuariosService {
  constructor(
    private httpService: HttpService,
    private redis: RedisProvider,
  ) {}

  async getUserData(Authorization: string) {
    const redisData = await this.redis.get('socialname');

    if (redisData) {
      return JSON.parse(redisData);
    }
    const apiData = await lastValueFrom(
      this.httpService.get(`${process.env.API_URL}/usuarios/socialname`, {
        headers: { Authorization },
      }),
    )
    this.redis.set('socialname', JSON.stringify(apiData.data));
    return apiData.data;
  }

  async getRacaCor(Authorization: string) {
    const redisData = await this.redis.get('racacor');

    if (redisData) {
      return JSON.parse(redisData);
    }

    const apiData = await lastValueFrom(
      this.httpService.get(`${process.env.API_URL}/usuarios/racacor`, {
        headers: { Authorization },
      }),
    );
    this.redis.set('racacor', JSON.stringify(apiData.data));
    return apiData.data;
  }
  async getEtnia(Authorization: string) {
    const redisData = await this.redis.get('etnia');

    if (redisData) {
      return JSON.parse(redisData);
    }

    const apiData = await lastValueFrom(
      this.httpService.get(`${process.env.API_URL}/usuarios/etnia`, {
        headers: { Authorization },
      }),
    );
    this.redis.set('etnia', JSON.stringify(apiData.data));
    return apiData.data;
  }
}
