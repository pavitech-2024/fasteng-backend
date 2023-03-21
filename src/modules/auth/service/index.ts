import { Injectable, Logger } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import axios from 'axios';
import { UsersRepository } from 'src/modules/users/repository';
import { User } from 'src/modules/users/schemas';
import { Token } from 'src/utils';
import { InputLoginUserDto, OutputLoginUserDto, InputRefreshLoginDto, RoxUser } from '../dto';
import { IAuthService } from '../interfaces';

@Injectable() // Injeta a classe no NestJS
export class AuthService implements IAuthService {
  private logger = new Logger(AuthService.name);
  private tokenService = new Token();

  constructor(private readonly usersRepository: UsersRepository) {}

  private async roxConnection(url: string, axiosMethod: string, data?: any): Promise<RoxUser> {
    try {
      // verifica se o usuário está ativo na rox
      const roxResponse = await axios[axiosMethod](url, data);

      if (!roxResponse) throw new UnauthorizedException('Erro ao conectar com a Rox');

      if (roxResponse.data.response_code !== '200 OK') throw new UnauthorizedException('Usuário não encontrado (Rox)');

      const roxUser: RoxUser = roxResponse.data.data;

      // verifica se o plano do usuário está ativo
      if (roxUser.plan_status !== 'ACTIVE') throw new UnauthorizedException('Usuário com plano inativo');

      return roxUser;
    } catch (error) {
      this.logger.error(`error on rox connection: ${error}`);
      throw error;
    }
  }

  async login(data: InputLoginUserDto): Promise<OutputLoginUserDto> {
    try {
      // busca o usuário no banco de dados da rox
      const roxUser = await this.roxConnection('https://fastengapp.com.br/minhaconta/api/auth', 'post', data);

      // busca o usuário no banco de dados do fasteng
      const user = await this.usersRepository.findOne({ _id: roxUser.uuid });

      if (!user) throw new UnauthorizedException('Usuário não encontrado');

      // atualiza o último login do usuário
      await this.usersRepository.updateUserLastLogin(user);

      // cria o token do usuário
      const token = this.tokenService.createToken(
        {
          planName: roxUser.plan_name,
          email: roxUser.email,
          name: roxUser.name,
          userId: roxUser.uuid,
          lastLogin: user.lastLoginList[user.lastLoginList.length - 1],
        },
        '10h',
      );

      return {
        statusCode: 200,
        token,
        user,
        name: roxUser.name,
        email: roxUser.email,
        planName: roxUser.plan_name,
      };
    } catch (error) {
      this.logger.error(`error on login: ${error}`);
      throw error;
    }
  }

  async refreshLogin(data: InputRefreshLoginDto): Promise<OutputLoginUserDto> {
    try {
      const { _id } = data;
      let { token } = data;

      // busca o usuário no banco de dados
      const user: User = await this.usersRepository.findOne({ _id });

      // verifica se o usuário existe no banco de dados
      if (!user) throw new UnauthorizedException('Usuário não encontrado');

      const roxUser = await this.roxConnection(`<aqui a rota da rox by ID>`, 'get');

      // verifica se o token é válido
      if (!this.tokenService.verifyToken(token)) throw new UnauthorizedException('Usuário com token inválido');
      else {
        // atualiza o token do usuário por mais 10horas
        token = this.tokenService.createToken(
          {
            planName: roxUser.plan_name,
            email: roxUser.email,
            name: roxUser.name,
            userId: roxUser.uuid,
            lastLogin: new Date(),
          },
          '10h',
        );

        // atualiza o último login do usuário
        await this.usersRepository.updateUserLastLogin(user);

        return {
          statusCode: 200,
          token,
          user,
          name: roxUser.name,
          planName: roxUser.plan_name,
        };
      }
    } catch (error) {
      this.logger.error(`error on refreshLogin: ${error}`);

      throw error;
    }
  }
}
