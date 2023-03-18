import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InputCreateUserDto } from '../dto';
import { User } from '../schemas';
import { UsersService } from '../service';

@Controller('users') // define a rota
@ApiTags('users') // define a tag no swagger
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /** async createUser
   * @author Pedro Foltram (FastEng Migration) (2023-03)
   *
   *  Método responsável por criar um usuário no banco de dados;
   *
   * @see {@link (Swagger) (localhost:8080/docs) (users)}
   *
   *
   * @param body:                     Objeto com email e senha do usuário
   *  @param {InputCreateUserDto}:    Objeto com inputs vindo da Rox
   *    @param body.uuid              Id do usuário
   *    @param body.connections       Número de conexões do usuário
   *
   *  @param lastLoginList            Lista de datas de logins do usuário
   *  @param photo                    Foto do usuário
   *
   * @returns {User}                  Objeto com token e dados do usuário
   *
   */
  @Post() // define a rota
  @ApiOperation({ summary: 'Cria um usuário no banco de dados' }) // detalha a operação no swagger
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso!' }) // detalha a resposta no swagger
  @ApiResponse({ status: 400, description: 'Bad Request' }) // detalha a resposta no swagger
  async createUser(@Body() body: InputCreateUserDto): Promise<User> {
    return this.usersService.createUser({
      uuid: body.uuid,
      connections: body.connections,
      lastLoginList: [new Date()],
      photo: null,
    });
  }

  /** async getUser
   * @author Pedro Foltram (FastEng Migration) (2023-03)
   *
   *  Método responsável por criar um usuário no banco de dados;
   *
   * @see {@link (Swagger) (localhost:8080/docs) (users/:id)}
   *
   * @param id                       Id do usuário
   * @returns {User}                  Objeto dados do usuário
   *
   */
  @Get(':id') // define a rota
  @ApiOperation({ summary: 'Retorna um usuário do banco de dados' }) // detalha a operação no swagger
  @ApiResponse({ status: 200, description: 'Usuário encontrado com sucesso!' }) // detalha a resposta no swagger
  @ApiResponse({ status: 400, description: 'Usuário não encontrado!' }) // detalha a resposta no swagger
  async getUser(@Param('id') id: string): Promise<User> {
    return this.usersService.getUser(id);
  }

  @Put() //define a rota
  @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso!' }) // detalha a resposta no swagger
  @ApiResponse({ status: 400, description: 'Usuário não encontrado!' }) // detalha a resposta no swagger
  @ApiOperation({ summary: 'Atualiza um usuário no banco de dados' }) // detalha a operação no swagger
  async updateUser(@Body() body: User): Promise<User> {
    return this.usersService.updateUser(body);
  }

  @Delete(':id') //define a rota
  @ApiResponse({ status: 200, description: 'Usuário excluído com sucesso!' }) // detalha a resposta no swagger
  @ApiResponse({ status: 400, description: 'Usuário não encontrado!' }) // detalha a resposta no swagger
  @ApiOperation({ summary: 'Deleta um usuário no banco de dados' }) // detalha a operação no swagger
  async deleteUser(@Param('id') id: string): Promise<User> {
    return await this.usersService.deleteUser(id);
  }
}
