import { Body, Controller, HttpCode, Logger, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InputLoginUserDto, OutputLoginUserDto } from '../dto';
import { InputRefreshLoginDto } from '../dto/refresh-login-user.dto';
import { AuthService } from '../service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  private logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @Post('login') // define a rota
  @HttpCode(200) // define o código de resposta
  @ApiOperation({ summary: 'Faz login no sistema' })
  @ApiBody({ type: InputLoginUserDto })
  @ApiResponse({ status: 200, description: 'Login realizado com sucesso', type: OutputLoginUserDto })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  async login(@Body() body: InputLoginUserDto) {
    this.logger.log(`logging user with params > [body]`);
    const data = await this.authService.login({
      email: body.email,
      password: body.password,
    });

    if (data.statusCode === 200) this.logger.log(`user logged with success`);

    return data;
  }

  @Post('refresh-login') // define a rota
  @HttpCode(200) // define o código de resposta
  @ApiOperation({
    summary: 'Faz login automático no sistema utilizando um possivel token válido',
  })

  @ApiBody({ type: InputRefreshLoginDto })
  @ApiResponse({ status: 200, description: 'Token renovado com sucesso', type: OutputLoginUserDto })
  @ApiResponse({ status: 401, description: 'Token inválido ou expirado' })
  async refreshLogin(@Body() body: InputRefreshLoginDto) {
    this.logger.log(`logging user with params > [body]`);
    const data = await this.authService.refreshLogin(body);

    if (data.statusCode === 200) this.logger.log(`user logged with success`);

    return data;
  }
}
