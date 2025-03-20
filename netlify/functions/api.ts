import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import serverless from 'serverless-http';
import { AppModule } from 'src/app.module';

export const handler = async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.set('trust proxy', 1);
  app.disable('x-powered-by');
  app.enableCors();

  const express = app.getHttpAdapter().getInstance();
  return serverless(express);
};
