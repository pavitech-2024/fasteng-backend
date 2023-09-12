import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

//Interceptors
import { ErrorsInterceptor } from './config/interceptors/ErrorsInterceptor';

//Middlewares
import { AuthMiddleware } from './modules/auth/middlewares';

//Modules
import { DatabaseModule } from './infra/mongoose/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AsphaltModule } from './modules/asphalt/asphalt.module';
import { SoilsModule } from './modules/soils/soils.module';
import { ConcreteModule } from './modules/concrete/concrete.module';
import { ReportErrorModule } from './modules/report-error/report-error.module';
import { ReportErrorController } from './modules/report-error/report-error.controller';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    AsphaltModule,
    SoilsModule,
    ConcreteModule,
    ReportErrorModule,
  ],
  controllers: [ReportErrorController],
  providers: [{ provide: APP_INTERCEPTOR, useClass: ErrorsInterceptor }],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware) // aplica o AuthMiddleWare para todas as rotas excluindo a de login
      .exclude(
        { path: 'auth/refresh-login', method: RequestMethod.POST }, // libera a rota de refresh login da autenticação
        { path: 'auth/login', method: RequestMethod.POST }, // libera a rota de login da autenticação
        { path: 'users', method: RequestMethod.POST }, // libera a rota de cadastro de usuários
        { path: 'docs/asphalt', method: RequestMethod.GET }, // libera a rota de documentação da API
        { path: 'docs/soils', method: RequestMethod.GET }, // libera a rota de documentação da API
        { path: 'docs/concrete', method: RequestMethod.GET }, // libera a rota de documentação da API
      )
      .forRoutes('*');
  }
}