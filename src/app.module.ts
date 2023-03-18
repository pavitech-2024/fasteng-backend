import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';

//Database
import { MongooseModule } from '@nestjs/mongoose';

//Middlewares
import { AuthMiddleware } from './modules/auth/middlewares';

//Modules
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
@Module({
  imports: [
    MongooseModule.forRoot(
      // common database
      'mongodb+srv://fasteng:dHjGSHOkTHRAwTN5@fasteng.fdugqs8.mongodb.net/common?retryWrites=true&w=majority',
      { connectionName: 'common' },
    ),
    MongooseModule.forRoot(
      // asphalt database
      'mongodb+srv://fasteng:dHjGSHOkTHRAwTN5@fasteng.fdugqs8.mongodb.net/asphalt?retryWrites=true&w=majority',
      { connectionName: 'asphalt' },
    ),
    MongooseModule.forRoot(
      // soils database
      'mongodb+srv://fasteng:dHjGSHOkTHRAwTN5@fasteng.fdugqs8.mongodb.net/soils?retryWrites=true&w=majority',
      { connectionName: 'soils' },
    ),
    MongooseModule.forRoot(
      // concrete database
      'mongodb+srv://fasteng:dHjGSHOkTHRAwTN5@fasteng.fdugqs8.mongodb.net/concrete?retryWrites=true&w=majority',
      { connectionName: 'concrete' },
    ),
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware) // aplica o AuthMiddleWare para todas as rotas excluindo a de login
      .exclude(
        { path: 'auth/login', method: RequestMethod.POST }, // libera a rota de login da autenticação
        { path: 'users', method: RequestMethod.POST }, // libera a rota de cadastro de usuários
      )
      .forRoutes('*');
  }
}
