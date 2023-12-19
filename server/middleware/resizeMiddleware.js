import sharp from 'sharp';

// Middleware để resize ảnh sử dụng Sharp
const resizeMiddleware = (req, res, next) => {
  if (!req.file) {
    return next(); // Nếu không có file, bỏ qua middleware này
  }

  // Đường dẫn tạm thời của file đã upload
  const tempPath = req.file.path;

  // Đường dẫn để lưu ảnh sau khi resize
  const outputPath = 'client/public/images/' + req.file.filename;

  // Resize ảnh bằng Sharp
  sharp(tempPath)
    .resize({ width: 150, height: 150 })
    .toFile(outputPath, (err) => {
      if (err) {
        console.error('Error resizing image:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      // Xoá file tạm thời
      fs.unlinkSync(tempPath);

      // Gán đường dẫn mới vào request để sử dụng trong các route tiếp theo
      req.file.path = outputPath;

      next();
    });
};

export default resizeMiddleware;
