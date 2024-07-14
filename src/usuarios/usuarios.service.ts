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
    let redisDataList = await this.redis.lrange('racacor', 0, 99999999999999);

    if (redisDataList) {
      redisDataList = redisDataList.map(data => JSON.parse(data))
      return redisDataList;
    }

    const apiData = await lastValueFrom(
      this.httpService.get(`${process.env.API_URL}/usuarios/racacor`, {
        headers: { Authorization },
      }),
    );
    for(let item of apiData.data) {
      this.redis.rpush('racacor', JSON.stringify(item))
    }
    return apiData.data;
  }

  async getEtnia(Authorization: string) {
    let redisDataList = await this.redis.lrange('etnia', 0, 99999999999999);
    if (redisDataList) {
      redisDataList = redisDataList.map(data => JSON.parse(data))
      return JSON.parse(JSON.stringify(redisDataList));
    }

    const apiData = await lastValueFrom(
      this.httpService.get(`${process.env.API_URL}/usuarios/etnia`, {
        headers: { Authorization },
      }),
    );
    for(let item of apiData.data) {
      this.redis.rpush('etnia', JSON.stringify(item))
    }
    return apiData.data;
  }
}
