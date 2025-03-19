import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.set('trust proxy', 1);
  app.disable('x-powered-by');
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000).then(async () => {
    Logger.log(`Server running on ${await app.getUrl()}`, 'Bootstrap');
  });
}

bootstrap().catch((err) => {
  Logger.error(err, '', 'Bootstrap');
});
