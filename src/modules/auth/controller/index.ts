import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { InputLoginUserDto } from '../dto';
import { InputRefreshLoginDto } from '../dto/refresh-login-user.dto';
import { AuthService } from '../service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
  async refreshLogin(@Body() body: InputRefreshLoginDto) {
    return this.authService.refreshLogin(body);
  }
}
