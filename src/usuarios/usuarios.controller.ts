import { Controller, Get, Headers, Query, UseGuards } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get('socialname')
  async getUsuario(@Headers('Authorization') token: string) {
    return this.usuariosService.getUserData(token);
  }
  @Get('racacor')
  async getRacaCor(@Headers('Authorization') token: string) {
    return this.usuariosService.getRacaCor(token);
  }
  @Get('etnia')
  async getEtnia(@Headers('Authorization') token: string) {
    return this.usuariosService.getEtnia(token);
  }
}
