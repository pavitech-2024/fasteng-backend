import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../schemas/user.schema';

export interface IUsersService {
  /** async createUser
   * @author Pedro Foltram (FastEng Migration) (2023-03)
   *
   * @description                     Método responsável por criar um usuário no banco de dados;
   *
   * @see {@link (Swagger) (localhost:8080/docs) (users/) (POST)}
   *
   *
   * @param data:                     Objeto com email e senha do usuário
   *  @param data.uuid                Id do usuário
   *  @param data.connections         Número de conexões do usuário
   *  @param data.lastLoginList       Lista de datas de logins do usuário
   *  @param data.photo               Foto do usuário
   *
   * @returns {User}                  Objeto com token e dados do usuário
   *
   */
  createUser({ uuid, connections, lastLoginList, photo }: CreateUserDto): Promise<User>;

  /** async getUser
   * @author Pedro Foltram (FastEng Migration) (2023-03)
   *
   * @description                     Método responsável por buscar um usuário no banco de dados;
   *
   * @see {@link (Swagger) (localhost:8080/docs) (users/:id) (GET)}
   *
   * @param id                       Id do usuário
   * @returns {User}                  Objeto dados do usuário
   *
   */
  getUser(id: string): Promise<User>;

  /** async updateUser
   * @author Pedro Foltram (FastEng Migration) (2023-03)
   *
   * @description                     Método responsável por atualizar um usuário no banco de dados;
   *
   * @see {@link (Swagger) (localhost:8080/docs) (users/) (PUT)}
   *
   * @param user:                     Objeto com dados do usuário
   *  @param user._id                 Id do usuário
   *  @param user.connections         Número de conexões do usuário
   *  @param user.lastLoginList       Lista de datas de logins do usuário
   *  @param user.photo               Foto do usuário
   *
   * @returns {User}                  Objeto com token e dados do usuário
   */
  updateUser(user: User): Promise<User>;

  /** async getUser
   * @author Pedro Foltram (FastEng Migration) (2023-03)
   *
   * @description                     Método responsável por deletar um usuário no banco de dados;
   *
   * @see {@link (Swagger) (localhost:8080/docs) (users/:id) (Delete)}
   *
   * @param id                       Id do usuário
   * @returns {User}                  Objeto dados do usuário
   *
   */
  deleteUser(id: string): Promise<User>;
}
