import { FilterQuery } from 'mongoose';
import { User } from '../schemas';

export interface IUserRepository {
  /** async create
   * @author Pedro Foltram (FastEng Migration) (2023-03)
   *
   * @description                           Método responsável por criar um usuário no banco de dados;
   *
   * @param User:                           Objeto com email e senha do usuário
   * @param User._id                        Id do usuário
   * @param User.connections                Lista de conexões do usuário
   * @param User.lastLoginList              Lista de logins do usuário
   * @param User.photo                      Foto do usuário
   *
   * @returns { User (Usuário Criado) }     Objeto com dados do usuário
   *
   */
  create(user: User): Promise<User>;

  /** async findOne
   * @author Pedro Foltram (FastEng Migration) (2023-03)
   *
   * @description                           Método responsável por encontrar um usuário no banco de dados e retornar-lo;
   *
   * @param userFilterQuery                 Campo para filtro do usuário no banco de dados
   *
   * @returns { User (Usuário Encontrado) } Objeto com dados do usuário encontrado
   *
   */
  findOne(userFilterQuery: FilterQuery<User>): Promise<User>;

  /** async findOneAndUpdate
   * @author Pedro Foltram (FastEng Migration) (2023-03)
   *
   * @description                           Método responsável por encontrar um usuário no banco de dados e retornar-lo;
   *
   * @param userFilterQuery                 Campo para filtro do usuário no banco de dados
   *
   * @returns { User (Usuário Encontrado) } Objeto com dados do usuário encontrado
   *
   */
  findOneAndUpdate(userFilterQuery: FilterQuery<User>, user: Partial<User>): Promise<User>;

  /** async findOneAndUpdate
   * @author Pedro Foltram (FastEng Migration) (2023-03)
   *
   * @description                           Método responsável por encontrar um usuário no banco de dados e deleta-lo;
   *
   * @param userFilterQuery                 Campo para filtro do usuário no banco de dados
   *
   * @returns { User (Usuário Deletado) }   Objeto com dados do usuário encontrado
   *
   */
  findOneAndDelete(userFilterQuery: FilterQuery<User>): Promise<User>;
}
