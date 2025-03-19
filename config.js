const { put } = require('@vercel/blob');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { URL } = require('url');

/**
 * @type {import("./dist/config.type.d.ts").UploadList}
 */
module.exports = {
  async vercel(file) {
    // console.log(file);
    const { url } = await put(file.originalname, file.buffer, {
      access: 'public',
    }).catch(() => {
      return { url: '' };
    });

    if (!url) {
      return {
        status: false,
        message: '上传失败',
      };
    }

    return {
      status: true,
      message: '上传成功',
      data: {
        links: {
          url: url,
        },
      },
    };
  },
  async cloudflareR2(file) {
    const S3 = new S3Client({
      region: 'auto',
      endpoint: process.env.R2_UPLOADURL,
      credentials: {
        // 访问密钥 ID
        accessKeyId: process.env.R2_ACCESSKEYID,
        secretAccessKey: process.env.R2_SECRETACCESSKEY,
      },
    });

    // 获取后缀名
    const ext = file.originalname.split('.').pop();
    const fileName = `${Date.now()}-${Math.random() * 1000000}.${ext}`;
    const command = new PutObjectCommand({
      Bucket: process.env.R2_ACCOUNT_NAME,
      Key: fileName,
      Body: file.buffer,
      // 文件类型
      ContentType: file.mimetype,
      // 缓存控制
      CacheControl: 'max-age=31536000',
    });
    const response = await S3.send(command).catch(() => {
      return { $metadata: { httpStatusCode: 500 } };
    });

    if (response.$metadata.httpStatusCode === 200) {
      return {
        status: true,
        message: '上传成功',
        data: {
          links: {
            url: new URL(
              `${fileName}`,

              process.env.R2_DOMAINNAME,
            ),
          },
        },
      };
    } else {
      return {
        status: false,
        message: '上传失败',
        data: {
          links: {
            url: '',
          },
        },
      };
    }
  },
};
