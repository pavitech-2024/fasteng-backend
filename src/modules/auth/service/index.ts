import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { verify } from 'jsonwebtoken';
import { UsersRepository } from 'src/modules/users/repository';
import { User } from 'src/modules/users/schemas';
import { Token } from 'src/utils';
import { InputLoginUserDto, OutputLoginUserDto } from '../dto';
import { InputAutoLoginDto } from '../dto/auto-login-user.dto';
import { IAuthService } from '../interfaces';

@Injectable() // Injeta a classe no NestJS
/** @see (Document){IAuthService} */
export class AuthService implements IAuthService {
  constructor(private readonly usersRepository: UsersRepository) {}

  /** @see (IAuthService)  */
  async login(data: InputLoginUserDto): Promise<OutputLoginUserDto> {
    //faz na API da Rox a autenticação do usuário
    return axios
      .post('https://fastengapp.com.br/minhaconta/api/auth', data)
      .then(async (response) => {
        // caso o código de resposta não seja 200, lança uma exceção de usuário não autorizado
        if (response.data.response_code !== '200 OK')
          // usuario não autorizado
          return {
            statusCode: 401,
            message: 'Usuário não autorizado',
            error: 'Unauthorized',
          };
        else {
          //busca no banco de dados o usuário com o id retornado pela API
          return await this.usersRepository.findOne({ _id: response.data.data.uuid }).then((user: User): any => {
            if (user) {
              {
                // caso o usuário já exista, atualiza a lista de logins
                // caso a lista de logins tenha o tamanho máximo, remove o primeiro elemento
                user.lastLoginList.length >= user.connections && user.lastLoginList.shift();

                user.lastLoginList.push(new Date());
              }

              //Gera um token com o nome do plano, email, nome, id e data do último login com duração de 10 horas
              const token = new Token(
                {
                  planName: response.data.data.plan_name,
                  email: data.email,
                  name: response.data.data.name,
                  userId: user._id,
                  lastLogin: user.lastLoginList[user.lastLoginList.length - 1],
                },
                '10h',
              );

              //atualiza o usuário no banco de dados
              return this.usersRepository.findOneAndUpdate({ _id: user._id }, user).then((user: User) => {
                //rota retorna esse objeto caso login seja bem sucedido
                return {
                  statusCode: 200,
                  token: token.value,
                  user,
                  name: response.data.data.name,
                  email: data.email,
                  planName: response.data.data.plan_name,
                };
              });
            }
            // caso o usuário não esteja no banco de dados, usuário não autorizado!
            //temporario: adding user to database
            else
              return this.usersRepository
                .create({
                  _id: response.data.data.uuid,
                  connections: response.data.data.connections,
                  lastLoginList: [new Date()],
                  photo: null,
                })
                .then((user: User) => {
                  {
                    // caso o usuário já exista, atualiza a lista de logins
                    // caso a lista de logins tenha o tamanho máximo, remove o primeiro elemento
                    user.lastLoginList.length >= user.connections && user.lastLoginList.shift();

                    user.lastLoginList.push(new Date());
                  }

                  //Gera um token com o nome do plano, email, nome, id e data do último login com duração de 10 horas
                  const token = new Token(
                    {
                      planName: response.data.data.plan_name,
                      email: data.email,
                      name: response.data.data.name,
                      userId: user._id,
                      lastLogin: user.lastLoginList[user.lastLoginList.length - 1],
                    },
                    '10h',
                  );

                  //atualiza o usuário no banco de dados
                  return this.usersRepository.findOneAndUpdate({ _id: user._id }, user).then((user: User) => {
                    //rota retorna esse objeto caso login seja bem sucedido
                    return {
                      statusCode: 200,
                      token: token.value,
                      user,
                      name: response.data.data.name,
                      email: data.email,
                      planName: response.data.data.plan_name,
                    };
                  });
                });
            // até aq
            /*
                else return {
                  statusCode: 401,
                  message: 'Usuário não autorizado',
                  error: 'Unauthorized',
                };
              */
          });
        }
      })
      .catch(() => {
        return {
          statusCode: 401,
          message: 'Usuário não autorizado',
          error: 'Unauthorized',
        };
      });
  }

  async refreshLogin(data: InputAutoLoginDto): Promise<OutputLoginUserDto> {
    // pega o token e o id do usuário dentro do body da requisição
    const { token, _id } = data;

    // busca o usuário no banco de dados
    return await this.usersRepository.findOne({ _id }).then((user) => {
      try {
        // verifica se o token é válido
        if (!verify(token, '590217ff68b0a589e3ecec6b78f9601a'))
          // usuario não autorizado
          return {
            statusCode: 401,
            message: 'Usuário não autorizado',
            error: 'Unauthorized',
          };
        // caso o token seja válido, verifica se o usuário existe no banco de dados da ROX e se a situação dele é normal
        else {
          // TODO:
          // verificar situação do usuário na Rox
          // gerar novo token
          // atualizar usuário no banco de dados
          // return tudo
          return user as unknown as OutputLoginUserDto;
        }
      } catch (error) {
        return {
          statusCode: 401,
          message: 'Usuário não autorizado',
          error: error,
        };
      }
    });
  }
}
