const { put } = require('@vercel/blob');

/**
 * @type {import("./dist/config.type.d.ts").ConfigJs}
 */
module.exports = {
  async upload(file) {
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
};
