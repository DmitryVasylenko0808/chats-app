import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 } from 'uuid';

import { UnprocessableEntityException } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

export const storageDestination = './uploads';
export const allowedFileTypes = ['image/jpeg', 'image/png'];
export const maxFileSize = 5 * 1024 * 1024;

export const generateFilename = (file: Express.Multer.File) => {
  const name = `${v4()}${extname(file.originalname)}`;

  return name;
};

export const uploadsStorage = diskStorage({
  destination: storageDestination,
  filename(req, file, callback) {
    callback(null, generateFilename(file));
  },
});

export const multerOptions: MulterOptions = {
  storage: uploadsStorage,
  limits: {
    fileSize: maxFileSize,
  },
  fileFilter: (req, file, cb) => {
    if (!allowedFileTypes.includes(file.mimetype)) {
      return cb(new UnprocessableEntityException('Unsupported file type'), false);
    }

    cb(null, true);
  },
};
