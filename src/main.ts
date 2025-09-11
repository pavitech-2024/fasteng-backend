// import { ValidationPipe } from '@nestjs/common';
// import { NestFactory } from '@nestjs/core';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { AppModule } from './app.module';
// import * as bodyParser from 'body-parser';

// //Commons Modules
// import { AuthModule } from './modules/auth/auth.module';
// import { UsersModule } from './modules/users/users.module';
// //Soils Modules
// import { SamplesModule } from './modules/soils/samples/samples.module';
// import { AllExceptionsFilter } from 'config/filters/http-exception.filter';

// async function bootstrap() {
//   // cria uma instância da aplicação
//   const app = await NestFactory.create(AppModule, {});

//   // habilita o CORS para que a aplicação possa ser acessada de qualquer origem.
//   app.enableCors();

//   // garante que todos os endpoints sejam protegidos contra o recebimento de dados incorretos.
//   app.useGlobalPipes(new ValidationPipe());

//   // adiciona um filtro global para lidar com exceções
//   app.useGlobalFilters(new AllExceptionsFilter());

//   // Aumenta o limite do payload (ex: 50MB)
//   app.use(bodyParser.json({ limit: '10mb' }));
//   app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

//   //config Swagger:
//   const swagger_asphalt = new DocumentBuilder()
//     .setTitle('FastEng API')
//     .setDescription(`The FastEng [ Asphalt ] API description`)
//     .setVersion('1.0')
//     .build();
//   SwaggerModule.setup(
//     'docs/asphalt',
//     app,
//     SwaggerModule.createDocument(app, swagger_asphalt, {
//       include: [AuthModule, UsersModule],
//     }),
//   );

//   const swagger_soils = new DocumentBuilder()
//     .setTitle('FastEng API')
//     .setDescription(`The FastEng [ Soils ] API description`)
//     .setVersion('1.0')
//     .build();
//   SwaggerModule.setup(
//     'docs/soils',
//     app,
//     SwaggerModule.createDocument(app, swagger_soils, {
//       include: [AuthModule, UsersModule, SamplesModule],
//     }),
//   );

//   const swagger_concrete = new DocumentBuilder()
//     .setTitle('FastEng API')
//     .setDescription(`The FastEng [ Soils ] API description`)
//     .setVersion('1.0')
//     .build();
//   SwaggerModule.setup('docs/concrete', app, SwaggerModule.createDocument(app, swagger_concrete));

//   // define a porta em que a aplicação será executada.
//   const port = process.env.PORT || 8080;

//   // inicia a aplicação.
//   await app.listen(port, () => console.log(`Server is running on port ${port}`));
// }
// bootstrap();


import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

//Commons Modules
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
//Soils Modules
import { SamplesModule } from './modules/soils/samples/samples.module';
import { AllExceptionsFilter } from './config/filters/http-exception.filter'; // Ajuste o caminho conforme
import { MaterialsModule } from 'modules/asphalt/materials/materials.module';



async function bootstrap() {
  // Criar a app com logs detalhados
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug', 'log'], // mais verboso
  });

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());

  // Filtro global que já loga erros
  app.useGlobalFilters(new AllExceptionsFilter());

  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

  // Swagger config
  const swagger_asphalt = new DocumentBuilder()
    .setTitle('FastEng API')
    .setDescription(`The FastEng [ Asphalt ] API description`)
    .setVersion('1.0')
    .build();
  SwaggerModule.setup(
    'docs/asphalt',
    app,
    SwaggerModule.createDocument(app, swagger_asphalt, {
      include: [AuthModule, UsersModule, MaterialsModule],
    }),
  );

  const swagger_soils = new DocumentBuilder()
    .setTitle('FastEng API')
    .setDescription(`The FastEng [ Soils ] API description`)
    .setVersion('1.0')
    .build();
  SwaggerModule.setup(
    'docs/soils',
    app,
    SwaggerModule.createDocument(app, swagger_soils, {
      include: [AuthModule, UsersModule, SamplesModule],
    }),
  );

  const swagger_concrete = new DocumentBuilder()
    .setTitle('FastEng API')
    .setDescription(`The FastEng [ Soils ] API description`)
    .setVersion('1.0')
    .build();
  SwaggerModule.setup('docs/concrete', app, SwaggerModule.createDocument(app, swagger_concrete));

  // Adiciona rota raiz simples para testes (evita 500 sem rota)
  app.getHttpAdapter().get('/', (req, res) => {
    res.json({ status: 'API is running!' });
  });

  const port = process.env.PORT || 8080;
  await app.listen(port, () => Logger.log(`Server is running on port ${port}`));
}
bootstrap();