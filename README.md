# vercel 图床

# 1、部署到vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/kongxiangyiren/kx-upload-image&env=AUTH_TOKEN&envDescription=AUTH_TOKEN就是twikoo的IMAGE_CDN_TOKEN)

## 2、生成 AUTH_TOKEN

随便写,不会可以使用 git bash 运行 `openssl rand -hex 64`

## 3、创建vercel Blob

点击 `Storage` 创建 `Blob` 存储,并关联项目

## 4、本地运行在项目根目录创建 `.env` 文件,并填写配置

## 5、其他图床请修改 `config.js`
