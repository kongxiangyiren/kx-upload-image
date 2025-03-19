# vercel 图床

# 1、部署到vercel

`UPLOAD_TYPE` 为 `vercel` 时, R2相关参数可忽略

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/kongxiangyiren/kx-upload-image&env=AUTH_TOKEN,UPLOAD_TYPE,R2_UPLOADURL,R2_ACCOUNT_NAME,R2_ACCESSKEYID,R2_SECRETACCESSKEY,R2_DOMAINNAME&envDescription=AUTH_TOKEN就是twikoo的IMAGE_CDN_TOKEN,UPLOAD_TYPE为vercel或cloudflareR2,R2_UPLOADURL为S3客户端使用管辖权地特定的终结点,R2_ACCOUNT_NAME储存桶名,R2_ACCESSKEYID访问密钥ID,R2_SECRETACCESSKEY机密访问密钥,R2_DOMAINNAME图床使用的域名&envLink=https://github.com/kongxiangyiren/kx-upload-image/blob/main/README.md)

## 2、生成 AUTH_TOKEN

随便写,不会可以使用 git bash 运行 `openssl rand -hex 64`

## 3、填写UPLOAD_TYPE

`UPLOAD_TYPE` 与 config.js 的方法有关

可选: `vercel` 或 `cloudflareR2`

## 3、创建vercel Blob (可选)

点击 `Storage` 创建 `Blob` 存储,并关联项目

## 4、cloudflare R2 (可选)

请自行百度创建

当前用到的配置

```sh
R2_UPLOADURL: 为 S3 客户端使用管辖权地特定的终结点,如: https://xx.r2.cloudflarestorage.com
R2_ACCOUNT_NAME: 储存桶名
R2_ACCESSKEYID: 访问密钥 ID
R2_SECRETACCESSKEY: 机密访问密钥
R2_DOMAINNAME: 图床使用的域名
```

## 4、本地运行在项目根目录创建 `.env` 文件,并填写配置

当前用到的配置

```sh
# 自定义token
AUTH_TOKEN=

# 使用的上传类型 cloudflareR2 或 vercel
UPLOAD_TYPE="cloudflareR2"

# vercel blob 读写token (可选)
# BLOB_READ_WRITE_TOKEN=

# cloudflare R2 配置 (可选)
R2_UPLOADURL=
R2_ACCOUNT_NAME=
R2_ACCESSKEYID=
R2_SECRETACCESSKEY=
R2_DOMAINNAME=

```

## 5、其他图床请修改 `config.js`
