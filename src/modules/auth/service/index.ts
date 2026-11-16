import { Injectable, Logger } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { UsersRepository } from '../../users/repository';
import { User } from '../../users/schemas';
import { Token } from '../../../utils';
import { InputLoginUserDto, OutputLoginUserDto, InputRefreshLoginDto } from '../dto';
import { IAuthService } from '../interfaces';
import { verifyPassword } from '../../../utils/password';

@Injectable() // Injeta a classe no NestJS
export class AuthService implements IAuthService {
  private logger = new Logger(AuthService.name);
  private tokenService = new Token();

  constructor(private readonly usersRepository: UsersRepository) {}

  async login(data: InputLoginUserDto): Promise<OutputLoginUserDto> {
    try {
      const user = await this.usersRepository.findOne({ email: data.email });
      this.logger.debug(`login attempt for email=${data.email}, userFound=${!!user}`);

      if (!user) {
        this.logger.warn(`login failed: user not found for email=${data.email}`);
        throw new UnauthorizedException('Usuário não encontrado');
      }
      if (!user.password) {
        this.logger.warn(`login failed: user has no password set for email=${data.email}`);
        throw new UnauthorizedException('Credenciais inválidas');
      }
      if (!verifyPassword(data.password, user.password)) {
        this.logger.warn(`login failed: invalid password for email=${data.email}`);
        throw new UnauthorizedException('Credenciais inválidas');
      }

      await this.usersRepository.updateUserLastLogin(user);

      const token = this.tokenService.createToken(
        {
          planName: 'INTERNAL',
          email: user.email,
          name: user.name,
          userId: user._id,
          lastLogin: user.lastLoginList[user.lastLoginList.length - 1],
        },
        '10h',
      );

      return {
        statusCode: 200,
        token,
        user,
        name: user.name,
        email: user.email,
        planName: 'INTERNAL',
      };
    } catch (error) {
      this.logger.error(`error on login: ${error}`);
      throw error;
    }
  }

  async refreshLogin(data: InputRefreshLoginDto): Promise<OutputLoginUserDto> {
    try {
      const { _id, token } = data;

      const user: User = await this.usersRepository.findOne({ _id });
      if (!user) throw new UnauthorizedException('Usuário não encontrado');

      if (!this.tokenService.verifyToken(token)) throw new UnauthorizedException('Usuário com token inválido');

      await this.usersRepository.updateUserLastLogin(user);

      const newToken = this.tokenService.createToken(
        {
          planName: 'INTERNAL',
          email: user.email,
          name: user.name,
          userId: user._id,
          lastLogin: new Date(),
        },
        '10h',
      );

      return {
        statusCode: 200,
        token: newToken,
        user,
        name: user.name,
        planName: 'INTERNAL',
        email: user.email,
      };
    } catch (error) {
      this.logger.error(`error on refreshLogin: ${error}`);
      throw error;
    }
  }
}
