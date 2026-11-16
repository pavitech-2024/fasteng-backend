import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from '../dto';
import { User } from '../schemas';
import { UsersRepository } from '../repository';
import { IUsersService } from '../interfaces';
import { AlreadyExists, NotFound } from '../../../utils/exceptions';
import { UpdateUserDto } from '../dto/update-user.dto';
import { hashPassword } from '../../../utils/password';

@Injectable()
export class UsersService implements IUsersService {
  private logger = new Logger(UsersService.name);

  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser({ uuid, connections, lastLoginList, photo, name, email, phone, dob, password }: CreateUserDto): Promise<User> {
    try {
      if (await this.usersRepository.findOne({ _id: uuid })) throw new AlreadyExists('User');

      const passwordHash = password ? hashPassword(password) : null;

      return this.usersRepository.create({
        _id: uuid,
        connections,
        lastLoginList,
        photo,
        name: name ?? '',
        email: email ?? '',
        phone: phone ?? '',
        dob: dob ?? new Date(),
        password: passwordHash,
        preferences: {
          language: 'pt-BR',
          decimal: 2,
        },
      });
    } catch (error) {
      this.logger.error(`error on create user > [error]: ${error}`);
      throw error;
    }
  }

  async getUser(id: string): Promise<User> {
    try {
      const user = await this.usersRepository.findOne({ _id: id });
      if (!user) throw new NotFound('User');
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
      const user = await this.usersRepository.findOne({ _id: id });
      if (!user) throw new NotFound('User');
      return this.usersRepository.findOneAndDelete({ _id: id });
    } catch (error) {
      this.logger.error(`error on delete user > [error]: ${error}`);
      throw error;
    }
  }

  // ============ ADICIONE ESTE MÉTODO AQUI ============
  async resetPassword(id: string, newPassword: string): Promise<User> {
    try {
      const existingUser = await this.usersRepository.findOne({ _id: id });
      
      if (!existingUser) {
        throw new NotFound('User');
      }

      // Gera o hash da nova senha
      const passwordHash = hashPassword(newPassword);
      
      // Atualiza a senha do usuário
      existingUser.password = passwordHash;

      // Salva no banco
      const updatedUser = await this.usersRepository.findOneAndUpdate(
        { _id: id }, 
        existingUser
      );

      this.logger.log(`password reset for user: ${id}`);
      
      return updatedUser;
    } catch (error) {
      this.logger.error(`error on reset password > [error]: ${error}`);
      throw error;
    }
  }

  async completeUserData(id: string, data: { email: string; name: string; password: string }): Promise<User> {
  try {
    const existingUser = await this.usersRepository.findOne({ _id: id });
    
    if (!existingUser) throw new NotFound('User');

    const passwordHash = hashPassword(data.password);
    
    existingUser.email = data.email;
    existingUser.name = data.name;
    existingUser.password = passwordHash;

    const updatedUser = await this.usersRepository.findOneAndUpdate(
      { _id: id }, 
      existingUser
    );

    this.logger.log(`✅ Dados completados para usuário: ${id}`);
    
    return updatedUser;
  } catch (error) {
    this.logger.error(`❌ Erro ao completar dados: ${error}`);
    throw error;
  }
}
}