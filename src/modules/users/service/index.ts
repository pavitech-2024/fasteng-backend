import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto';
import { User } from '../schemas';
import { UsersRepository } from '../repository';
import { IUsersService } from '../interfaces';
import { AlreadyExists, NotFound } from 'src/utils/exceptions';
@Injectable() // permite que a classe seja injetada em outros lugares
/** @see (Document){IUsersService} */
export class UsersService implements IUsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser({ uuid, connections, lastLoginList, photo }: CreateUserDto): Promise<User> {
    if (await this.usersRepository.findOne({ _id: uuid })) throw new AlreadyExists('User');

    //cria um usuário no banco de dados e retorna o usuário criado
    return this.usersRepository.create({
      _id: uuid,
      connections,
      lastLoginList,
      photo,
    });
  }

  async getUser(id: string): Promise<User> {
    // busca um usuário com o id passado no banco de dados
    const user = await this.usersRepository.findOne({ _id: id });

    // se não encontrar o usuário, retorna um erro
    if (!user) throw new NotFound('User');

    // retorna o usuário encontrado
    return user;
  }

  async updateUser(body: User): Promise<User> {
    // busca um usuário com o id passado no banco de dados
    const user = await this.usersRepository.findOne({ _id: body._id });

    // se não encontrar o usuário, retorna um erro
    if (!user) throw new NotFound('User');

    // atualiza o usuário no banco de dados
    return this.usersRepository.findOneAndUpdate({ _id: body._id }, body);
  }

  async deleteUser(id: string): Promise<User> {
    // busca um usuário com o id passado no banco de dados
    const user = await this.usersRepository.findOne({ _id: id });

    // se não encontrar o usuário, retorna um erro
    if (!user) throw new NotFound('User');

    // deleta o usuário no banco de dados
    return this.usersRepository.findOneAndDelete({ _id: id });
  }
}
