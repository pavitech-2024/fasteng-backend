import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { InputLoginUserDto } from '../dto';
import { InputAutoLoginDto } from '../dto/auto-login-user.dto';
import { AuthService } from '../service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /** /auth/login
   * @author Pedro Foltram (FastEng Migration) (2023-03)
   *
   * Rota para fazer login no sistema
   *  Faz a autenticação do usuário na API da Rox;
   *  Fazer autenticação no banco de dados;
   *  Gerar token;
   *  Atualizar lista de logins;
   *
   * @see {@link (Swagger) (localhost:8080/docs) (users/login)}
   *
   * @param body:
   *   @param {InputLoginUserDto}:    Objeto com email e senha do usuário
   *     @param body.email            Email do usuário
   *     @param body.password         Senha do usuário
   *
   * @returns {OutputLoginUserDto}    Objeto com token e dados do usuário
   *  @param success                  Booleano que indica se o login foi bem sucedido
   *  @param token                    Token gerado com os dados do usuário
   *  @param user                     Dados do usuário
   *  @param name                     Nome do usuário
   *  @param email                    Email do usuário
   *  @param planName                 Nome do plano do usuário
   *
   */
  @Post('login') // define a rota
  @HttpCode(200) // define o código de resposta
  @ApiOperation({ summary: 'Faz login no sistema' })
  async login(@Body() body: InputLoginUserDto) {
    return this.authService.login({
      email: body.email,
      password: body.password,
    });
  }

  @Post('refresh-login') // define a rota
  @HttpCode(200) // define o código de resposta
  @ApiOperation({
    summary: 'Faz login automático no sistema utilizando um possivel token válido',
  })
  async refreshLogin(@Body() body: InputAutoLoginDto) {
    return this.authService.refreshLogin(body);
  }
}
