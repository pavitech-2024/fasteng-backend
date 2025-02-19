import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from '../dto';
import { User } from '../schemas';
import { UsersRepository } from '../repository';
import { IUsersService } from '../interfaces';
import { AlreadyExists, NotFound } from '../../../utils/exceptions';
import { UpdateUserDto } from '../dto/update-user.dto';
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
        name: '', 
        email: '', 
        phone: '', 
        dob: new Date(), 
        preferences: {
          language: 'pt-BR',
          decimal: 2,
        },
      });
      /*const createdUser = await this.usersRepository.create(newUser);
      this.logger.log('user created with success > [id]: ' + createdUser._id);  
      return createdUser;*/
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

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
  try {
    const existingUser = await this.usersRepository.findOne({ _id: id });
    if (!existingUser) throw new NotFound('User');

    const { photo, name, email, phone, dob, preferences } = updateUserDto;

    if (photo) existingUser.photo = photo;
    if (name) existingUser.name = name;
    if (email) existingUser.email = email;
    if (phone) existingUser.phone = phone;
    if (dob) existingUser.dob = new Date(dob);
    if (preferences) existingUser.preferences = preferences;

    return await this.usersRepository.findOneAndUpdate({ _id: id }, existingUser);
  } catch (error) {
    this.logger.error(`Error updating user: ${error}`);
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
