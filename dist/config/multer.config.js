"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerConfig = void 0;
const multer_1 = require("multer");
const path_1 = require("path");
exports.multerConfig = {
    dest: './uploads',
    storage: (0, multer_1.diskStorage)({
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
            cb(null, `${randomName}${(0, path_1.extname)(file.originalname)}`);
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
        }
        else {
            cb(new Error('Invalid file type. Only JPEG, PNG, and GIF files are allowed.'), false);
        }
    },
};
//# sourceMappingURL=multer.config.js.map