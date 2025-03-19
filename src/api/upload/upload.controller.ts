import {
  Controller,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { UploadList } from 'src/config.type';

@Controller('upload')
export class UploadController {
  constructor(private config: ConfigService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @Req() req: Request,
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    const token = req.headers.authorization;

    if (!this.config.get<string>('AUTH_TOKEN')) {
      return {
        status: false,
        message: 'AUTH_TOKEN 没有配置',
      };
    }

    if (token !== 'Bearer ' + this.config.get('AUTH_TOKEN')) {
      return {
        status: false,
        message: 'token 错误',
      };
    }

    if (!file) {
      return {
        status: false,
        message: '请上传图片',
      };
    }

    if (!file.mimetype.startsWith('image/')) {
      console.log('file.mimetype', file.mimetype);

      return {
        status: false,
        message: '请上传图片',
        data: file.mimetype,
      };
    }

    if (!this.config.get<string>('UPLOAD_TYPE')) {
      return {
        status: false,
        message: '请检查UPLOAD_TYPE配置',
      };
    }

    if (
      typeof this.config.get(
        this.config.get<string>('UPLOAD_TYPE') as string,
      ) !== 'function'
    ) {
      return {
        status: false,
        message: '请检查UPLOAD_TYPE配置',
      };
    }

    const newFile = await (
      this.config.get(
        this.config.get<string>('UPLOAD_TYPE') as string,
      ) as UploadList[string]
    )(file);

    return newFile;
  }
}
