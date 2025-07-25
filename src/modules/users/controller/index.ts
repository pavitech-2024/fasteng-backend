import { Body, Controller, Delete, Get, Logger, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InputCreateUserDto } from '../dto';
import { User } from '../schemas';
import { UsersService } from '../service';


@Controller('users') // define a rota
@ApiTags('users') // define a tag no swagger
export class UsersController {
  // define o logger
  private logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

  @Post() // define a rota
  @ApiOperation({ summary: 'Cria um usuário no banco de dados.' }) // detalha a operação no swagger
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso!' }) // detalha a resposta no swagger
  @ApiResponse({ status: 400, description: 'Bad Request.' }) // detalha a resposta no swagger
  async createUser(@Body() body: InputCreateUserDto): Promise<User> {
    this.logger.log(`create user with params > [body]: ${JSON.stringify(body)}`);

    const user = await this.usersService.createUser({
      uuid: body.uuid,
      connections: body.connections,
      lastLoginList: [new Date()],
      photo: null,

    });

    if (user) this.logger.log(`user created with success > [id]: ${user._id}`);

    return user;

  }

  @Get(':id')
  @ApiOperation({ summary: 'Retorna um usuário do banco de dados.' }) 
  @ApiResponse({ status: 200, description: 'Usuário encontrado com sucesso!' }) // detalha a resposta no swagger
  @ApiResponse({ status: 400, description: 'Usuário não encontrado!' }) // detalha a resposta no swagger
  async getUser(@Param('id') id: string): Promise<User> {
    this.logger.log(`get user with id > [id]: ${id}`);

    const user = await this.usersService.getUser(id);

    if (user) this.logger.log(`user found with sucess > [user]`);
    

    return user;
    
  }

  @Put(':id') //define a rota
  @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso!' }) 
  @ApiResponse({ status: 400, description: 'Usuário não encontrado!' }) 
  @ApiOperation({ summary: 'Atualiza um usuário no banco de dados' }) 
  async updateUser(@Param('id') id: string, @Body() body: User): Promise<User> {
    this.logger.log(`update user > [user]`);

    const user = await this.usersService.updateUser(id, body);

    if (user) this.logger.log(`user updated with sucess > [user]`);

    return user;
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Usuário excluído com sucesso!' })
  @ApiResponse({ status: 400, description: 'Usuário não encontrado!' })
  @ApiOperation({ summary: 'Deleta um usuário no banco de dados' })
  async deleteUser(@Param('id') id: string): Promise<User> {
    this.logger.log(`delete user > [id]: ${id}`);

    const user = await this.usersService.deleteUser(id);

    if (user) this.logger.log(`user deleted with sucess > [user]`);

    return user;
  }
}
