import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { origin: 'http://localhost:3006', credentials: true },
  });
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
