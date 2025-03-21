import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { AppFilter } from './app.filter';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { existsSync } from 'fs';
import { UploadList } from './config.type';
@Module({
  imports: [
    ApiModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      validate(config) {
        const configPath = join(process.cwd(), '/config.js');
        // require(configPath)
        if (existsSync(configPath))
          try {
            const doc = require(configPath) as UploadList;

            for (const key in doc) {
              if (!config[key]) {
                config[key] = doc[key];
              }
            }
          } catch (e) {
            console.log('config.js 配置文件错误', e);
          }

        return config;
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AppFilter,
    },
  ],
})
export class AppModule {}
