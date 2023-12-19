import multer from 'multer';
import path from 'path';

// Thiết lập disk storage cho Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Đường dẫn đến thư mục lưu trữ ảnh
    cb(null, 'client/public/images');
  },
  filename: function (req, file, cb) {
    // Tạo tên file mới với Math.random()
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    const fileName = `${uniqueSuffix}${extension}`;
    cb(null, fileName);
  },
});

// Tạo middleware Multer với cấu hình storage
const upload = multer({ storage: storage });

export default upload;
