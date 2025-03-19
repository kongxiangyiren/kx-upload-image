export interface UploadReturn {
  status: boolean;
  message: string;
  data?: {
    links: {
      url: string;
    };
  };
}

export interface UploadList {
  [key: string]: (file: Express.Multer.File) => Promise<UploadReturn>;
}
