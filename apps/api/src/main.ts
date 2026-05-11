import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin:
      process.env.CORS_ORIGINS?.split(',').map((o) => o.trim()) ?? [
        'http://localhost:3000',
      ],
    credentials: true,
  });

  app.setGlobalPrefix('api/v1');

  const port = Number(process.env.PORT ?? 3001);
  await app.listen(port);
}
bootstrap();
