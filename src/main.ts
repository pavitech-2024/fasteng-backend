import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

//Commons Modules
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
//Soils Modules
import { SamplesModule } from './modules/soils/samples/samples.module';

async function bootstrap() {
  // cria uma instância da aplicação
  const app = await NestFactory.create(AppModule, {});

  // habilita o CORS para que a aplicação possa ser acessada de qualquer origem.
  app.enableCors();

  // garante que todos os endpoints sejam protegidos contra o recebimento de dados incorretos.
  app.useGlobalPipes(new ValidationPipe());

  //config Swagger:
  const swagger_asphalt = new DocumentBuilder()
    .setTitle('FastEng API')
    .setDescription(`The FastEng [ Asphalt ] API description`)
    .setVersion('1.0')
    .build();
  SwaggerModule.setup(
    'docs/asphalt',
    app,
    SwaggerModule.createDocument(app, swagger_asphalt, {
      include: [AuthModule, UsersModule],
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

  // define a porta em que a aplicação será executada.
  const port = process.env.PORT || 8082;

  // inicia a aplicação.
  await app.listen(port, () => console.log(`Server is running on port ${port}`));
}
bootstrap();
