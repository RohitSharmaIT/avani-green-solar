import express from 'express';
import multer from 'multer';
import { uploadToCloudinary, deleteFromCloudinary } from '../config/cloudinary.js';

const router = express.Router();

// Configure Multer for in-memory storage (up to 10MB per file)
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed.'), false);
    }
  }
});

// POST /api/upload
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file uploaded.' });
    }

    const result = await uploadToCloudinary(req.file.buffer, {
      mimetype: req.file.mimetype,
      original_filename: req.file.originalname
    });

    return res.json({
      success: true,
      url: result.url,
      public_id: result.public_id,
      provider: result.provider
    });
  } catch (err) {
    console.error('[Upload] Error uploading image:', err);
    return res.status(500).json({ message: 'Failed to upload image.', error: err.message });
  }
});

// DELETE /api/upload/:publicId
router.delete('/:publicId', async (req, res) => {
  try {
    await deleteFromCloudinary(req.params.publicId);
    return res.json({ success: true, message: 'Image deleted.' });
  } catch (err) {
    return res.status(500).json({ message: 'Error deleting image.', error: err.message });
  }
});

export default router;
