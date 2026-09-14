import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

const isConfigured = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET &&
  process.env.CLOUDINARY_CLOUD_NAME !== 'your_cloudinary_cloud_name'
);

if (isConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
  console.log('[Cloudinary] Configured with cloud:', process.env.CLOUDINARY_CLOUD_NAME);
} else {
  console.log('[Cloudinary] Credentials not yet configured in .env - upload fallback mode active.');
}

export function isCloudinaryConfigured() {
  return isConfigured;
}

export async function uploadToCloudinary(buffer, options = {}) {
  if (isConfigured) {
    return new Promise((resolve, reject) => {
      const uploadOptions = {
        folder: 'avani_green_solar',
        resource_type: 'auto',
        ...options
      };

      const stream = cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
        if (error) return reject(error);
        resolve({
          url: result.secure_url || result.url,
          public_id: result.public_id,
          format: result.format,
          bytes: result.bytes,
          width: result.width,
          height: result.height,
          provider: 'cloudinary'
        });
      });

      stream.end(buffer);
    });
  }

  // Graceful fallback for local development if Cloudinary credentials are empty:
  // Convert buffer to data URI so user immediately gets a working image preview
  const mimeType = options.mimetype || 'image/jpeg';
  const base64Data = `data:${mimeType};base64,${buffer.toString('base64')}`;
  return {
    url: base64Data,
    public_id: `fallback_${Date.now()}`,
    provider: 'local_fallback'
  };
}

export async function deleteFromCloudinary(publicId) {
  if (isConfigured && publicId && !publicId.startsWith('fallback_')) {
    try {
      return await cloudinary.uploader.destroy(publicId);
    } catch (err) {
      console.warn('[Cloudinary] Could not delete image:', publicId, err.message);
    }
  }
  return null;
}

export default cloudinary;
