import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  // cria uma instância da aplicação
  const app = await NestFactory.create(AppModule);

  // garante que todos os endpoints sejam protegidos contra o recebimento de dados incorretos.
  app.useGlobalPipes(new ValidationPipe());

  //config Swagger:
  const config = new DocumentBuilder()
    .setTitle('FastEng API')
    .setDescription('The FastEng API description')
    .setVersion('1.0')
    .addTag('users')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // define a porta em que a aplicação será executada.
  await app.listen(8080);
}
bootstrap();
