import { Body, Controller, HttpCode, Logger, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { InputLoginUserDto } from '../dto';
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
  async refreshLogin(@Body() body: InputRefreshLoginDto) {
    this.logger.log(`logging user with params > [body]`);
    const data = await this.authService.refreshLogin(body);

    if (data.statusCode === 200) this.logger.log(`user logged with success`);

    return data;
  }
}
