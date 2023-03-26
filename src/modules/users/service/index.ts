import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from '../dto';
import { User } from '../schemas';
import { UsersRepository } from '../repository';
import { IUsersService } from '../interfaces';
import { AlreadyExists, NotFound } from '../../../utils/exceptions';
@Injectable() // permite que a classe seja injetada em outros lugares
/** @see (Document){IUsersService} */
export class UsersService implements IUsersService {
  private logger = new Logger(UsersService.name);

  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser({ uuid, connections, lastLoginList, photo }: CreateUserDto): Promise<User> {
    try {
      if (await this.usersRepository.findOne({ _id: uuid })) throw new AlreadyExists('User');

      //cria um usuário no banco de dados e retorna o usuário criado
      return this.usersRepository.create({
        _id: uuid,
        connections,
        lastLoginList,
        photo,
      });
    } catch (error) {
      // se ocorrer algum erro, retorna o erro
      this.logger.error(`error on create user > [error]: ${error}`);

      throw error;
    }
  }

  async getUser(id: string): Promise<User> {
    try {
      // busca um usuário com o id passado no banco de dados
      const user = await this.usersRepository.findOne({ _id: id });

      // se não encontrar o usuário, retorna um erro
      if (!user) throw new NotFound('User');

      // retorna o usuário encontrado
      return user;
    } catch (error) {
      this.logger.error(`error on get user > [error]: ${error}`);

      throw error;
    }
  }

  async updateUser(body: User): Promise<User> {
    try {
      // busca um usuário com o id passado no banco de dados
      const user = await this.usersRepository.findOne({ _id: body._id });

      // se não encontrar o usuário, retorna um erro
      if (!user) throw new NotFound('User');

      // atualiza o usuário no banco de dados
      return this.usersRepository.findOneAndUpdate({ _id: body._id }, body);
    } catch (error) {
      this.logger.error(`error on update user > [error]: ${error}`);

      throw error;
    }
  }

  async deleteUser(id: string): Promise<User> {
    try {
      // busca um usuário com o id passado no banco de dados
      const user = await this.usersRepository.findOne({ _id: id });

      // se não encontrar o usuário, retorna um erro
      if (!user) throw new NotFound('User');

      // deleta o usuário no banco de dados
      return this.usersRepository.findOneAndDelete({ _id: id });
    } catch (error) {
      this.logger.error(`error on delete user > [error]: ${error}`);

      throw error;
    }
  }
}
