// import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
// import { APP_INTERCEPTOR } from '@nestjs/core';
// import { ConfigModule } from '@nestjs/config';

// //Interceptors
// import { ErrorsInterceptor } from './config/interceptors/ErrorsInterceptor';

// //Middlewares
// import { AuthMiddleware } from './modules/auth/middlewares';

// //Modules
// import { DatabaseModule } from './infra/mongoose/database.module';
// import { AuthModule } from './modules/auth/auth.module';
// import { UsersModule } from './modules/users/users.module';
// import { AsphaltModule } from './modules/asphalt/asphalt.module';
// import { SoilsModule } from './modules/soils/soils.module';
// import { ConcreteModule } from './modules/concrete/concrete.module';
// import { ReportErrorModule } from './modules/report-error/report-error.module';
// import { ReportErrorController } from './modules/report-error/report-error.controller';
// import { ProMedinaModule } from './modules/pro-medina/pro-medina.module';
// import { MongooseModule } from '@nestjs/mongoose';
// import { AppController } from 'app.controller';
// import { AppService } from 'app.service';

// @Module({
//   imports: [
//     ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
//     DatabaseModule,
//     AuthModule,
//     UsersModule,
//     AsphaltModule,
//     SoilsModule,
//     ConcreteModule,
//     ReportErrorModule,
//     ProMedinaModule,
//     MongooseModule,
//   ],
//   controllers: [ReportErrorController, AppController],
//   providers: [{ provide: APP_INTERCEPTOR, useClass: ErrorsInterceptor }, AppService],
// })
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(AuthMiddleware) // aplica o AuthMiddleWare para todas as rotas excluindo a de login
//       .exclude(
//         { path: 'auth/refresh-login', method: RequestMethod.POST }, // libera a rota de refresh login da autenticação
//         { path: 'auth/login', method: RequestMethod.POST }, // libera a rota de login da autenticação
//         { path: 'users', method: RequestMethod.POST }, // libera a rota de cadastro de usuários
//         { path: 'docs/asphalt', method: RequestMethod.GET }, // libera a rota de documentação da API
//         { path: 'docs/soils', method: RequestMethod.GET }, // libera a rota de documentação da API
//         { path: 'docs/concrete', method: RequestMethod.GET }, // libera a rota de documentação da API
//         { path: 'docs/promedina', method: RequestMethod.GET }, // libera a rota de documentação da API
//         { path: 'app/health-check', method: RequestMethod.GET },
//       )
//       .forRoutes('*');
//   }
// }


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
import { AsphaltModule } from './modules/asphalt/asphalt.module';
import { SoilsModule } from './modules/soils/soils.module';
import { ConcreteModule } from './modules/concrete/concrete.module';
import { ReportErrorModule } from './modules/report-error/report-error.module';
import { ReportErrorController } from './modules/report-error/report-error.controller';
import { ProMedinaModule } from './modules/pro-medina/pro-medina.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from 'app.controller';
import { AppService } from 'app.service';

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
    ProMedinaModule,
    MongooseModule,
  ],
  controllers: [ReportErrorController, AppController],
  providers: [{ provide: APP_INTERCEPTOR, useClass: ErrorsInterceptor }, AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: '/', method: RequestMethod.GET },
        { path: 'favicon.ico', method: RequestMethod.GET },
        { path: 'favicon.png', method: RequestMethod.GET },
        { path: 'auth/refresh-login', method: RequestMethod.POST },
        { path: 'auth/login', method: RequestMethod.POST },
        { path: 'users', method: RequestMethod.POST },
        { path: 'docs/asphalt', method: RequestMethod.GET },
        { path: 'docs/soils', method: RequestMethod.GET },
        { path: 'docs/concrete', method: RequestMethod.GET },
        { path: 'docs/promedina', method: RequestMethod.GET },
        { path: 'app/health-check', method: RequestMethod.GET },
      )
      .forRoutes('*');
  }
  
}