import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const env = process.env;

  console.log(env.HOST, env.PORT);

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: env.HOST,
      port: env.PORT,
    },
  });
  await app.startAllMicroservices();
}
bootstrap();
