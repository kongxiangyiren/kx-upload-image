import { Module, SetMetadata } from '@nestjs/common';
import { MODULE_PATH } from '@nestjs/common/constants';
import { UploadController } from './upload/upload.controller';
import { MulterModule } from '@nestjs/platform-express';

@SetMetadata(MODULE_PATH, 'api/v1')
@Module({
  imports: [
    MulterModule.register({
      //限制文件上传大小
      limits: {
        fileSize: 1024 * 1024 * 100, //文件上传最大100MB
      },
    }),
  ],
  controllers: [UploadController],
})
export class ApiModule {}
