import multer from 'multer';
import path from 'path';

export const uploadDir = path.join(__dirname, '..', '..', 'uploads');

// Receipt photos are saved to disk (max 5 MB, images only).
export const upload = multer({
  dest: uploadDir,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => cb(null, file.mimetype.startsWith('image/')),
});
