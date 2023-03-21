import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

//Interceptors
import { ErrorsInterceptor } from './config/interceptors/ErrorsInterceptor';

//Middlewares
import { AuthMiddleware } from './modules/auth/middlewares';

//Modules
import { DatabaseModule } from './infra/mongoose/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }), DatabaseModule, AuthModule, UsersModule],
  controllers: [],
  providers: [{ provide: APP_INTERCEPTOR, useClass: ErrorsInterceptor }],
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
