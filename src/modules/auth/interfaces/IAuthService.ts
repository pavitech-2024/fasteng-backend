import { InputLoginUserDto, OutputLoginUserDto } from '../dto';

export interface IAuthService {
  /** async login
   * @author Pedro Foltram (FastEng Migration) (2023-03)
   *
   *  @description                    Método responsável por fazer a autenticação do usuário na API da Rox;
   *  @description                    Fazer autenticação no banco de dados;
   *  @description                    Gerar token;
   *  @description                    Atualizar lista de logins;
   *
   * @see {@link (Swagger) (localhost:8080/docs/users) (login)}
   *
   *
   * @param data:                     Objeto com email e senha do usuário
   *  @param data.email               Email do usuário
   *  @param data.password            Senha do usuário
   *
   * @returns {OutputLoginUserDto}    Objeto com token e dados do usuário
   *  @param success                  Booleano que indica se o login foi bem sucedido
   *  @param token                    Token gerado com os dados do usuário
   *  @param user                     Dados do usuário
   *  @param name                     Nome do usuário
   *  @param email                    Email do usuário
   *  @param planName                 Nome do plano do usuário
   *
   */
  login(data: InputLoginUserDto): Promise<OutputLoginUserDto>;

  refreshLogin(data: { token: string; _id: string }): Promise<any>;
}
