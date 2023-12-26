import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerConfig: MulterOptions = {
  dest: './uploads',
  storage: diskStorage({
    destination: (req, file, cb) => {
      console.log('Inside destination function...');
      cb(null, './uploads');
    },
    filename: (req, file, cb) => {
      console.log('Inside filename function...');
      const randomName = Array(32)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
      cb(null, `${randomName}${extname(file.originalname)}`);
    },
  }),
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  fileFilter: (req, file, cb) => {
    console.log('Inside fileFilter function...');
    const allowedMimes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, and GIF files are allowed.'), false);
    }
  },
};
