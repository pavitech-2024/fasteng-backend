import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  // cria uma instância da aplicação
  const app = await NestFactory.create(AppModule, {});

  // habilita o CORS para que a aplicação possa ser acessada de qualquer origem.
  app.enableCors();

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
  const port = process.env.PORT || 8080;

  // inicia a aplicação.
  await app.listen(port, () => console.log(`Server is running on port ${port}`));
}
bootstrap();
