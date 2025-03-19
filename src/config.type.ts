export interface ConfigJs {
  upload(file: Express.Multer.File): Promise<UploadReturn>;
}

export interface UploadReturn {
  status: boolean;
  message: string;
  data?: {
    links: {
      url: string;
    };
  };
}
