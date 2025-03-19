import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  HttpException,
  InternalServerErrorException,
  NotFoundException,
  PayloadTooLargeException,
} from '@nestjs/common';

import { Response } from 'express';

@Catch(HttpException)
export class AppFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const message = exception.getResponse() as {
      message?: string | string[];
      error?: string;
      statusCode?: number;
    }; //获取异常消息

    if (exception instanceof PayloadTooLargeException) {
      message.message = '上传文件过大';
      message.error = '上传文件过大';
    }

    // 403
    if (exception instanceof ForbiddenException) {
      message.message = '没有权限';
      message.error = '没有权限';
    }

    // 404
    if (exception instanceof NotFoundException) {
      message.message = '资源不存在';
      message.error = '资源不存在';
    }

    // 500
    if (exception instanceof InternalServerErrorException) {
      message.message = '服务器错误';
      message.error = '服务器错误';
    }

    return response.status(status).json({
      message: message.message,
      data: message.error,
      statusCode: message.statusCode,
      status: status,
    });
  }
}
