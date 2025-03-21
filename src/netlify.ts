import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import * as express from 'express';
import * as serverless from 'serverless-http';
import { Express } from 'express-serve-static-core';

const server = express();
let cacheNest = false;

const createNestServer = async (expressInstance: Express) => {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(expressInstance),
  );
  app.enableCors();
  app.set('trust proxy', 1);
  app.disable('x-powered-by');

  await app.init();
};

const appServer = serverless(server);

exports.handler = async (event: any, context: any) => {
  if (!cacheNest) {
    await createNestServer(server)
      .then(() => console.log('Nest Ready'))
      .catch((err) => console.error('Nest broken', err));
    cacheNest = true;
  }

  return await appServer(event, context);
};
