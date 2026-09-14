import express from 'express';
import jwt from 'jsonwebtoken';
import { Admin } from '../models/Admin.js';
import { requireAuth } from '../middleware/auth.js';
import { isCloudinaryConfigured } from '../config/cloudinary.js';

const router = express.Router();

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }

    const admin = await Admin.findOne({ username: username.trim() });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid admin credentials.' });
    }

    const isMatch = await admin.comparePassword(password.trim());
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid admin credentials.' });
    }

    admin.lastLogin = new Date();
    await admin.save();

    const secret = process.env.JWT_SECRET || 'avani_green_solar_secret_jwt_key_2026_mp';
    const token = jwt.sign(
      { id: admin._id, username: admin.username, role: admin.role },
      secret,
      { expiresIn: '7d' }
    );

    return res.json({
      success: true,
      message: 'Admin login successful',
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        name: admin.name,
        role: admin.role
      }
    });
  } catch (err) {
    console.error('[Auth] Login error:', err);
    return res.status(500).json({ message: 'Internal server error during authentication.' });
  }
});

// GET /api/auth/me
router.get('/me', requireAuth, (req, res) => {
  res.json({
    admin: req.admin,
    cloudinaryConfigured: isCloudinaryConfigured()
  });
});

// POST /api/auth/change-password
router.post('/change-password', requireAuth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Both current and new password are required.' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'New password must be at least 6 characters long.' });
    }

    const admin = await Admin.findById(req.admin._id);
    const isMatch = await admin.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect current password.' });
    }

    admin.password = newPassword;
    await admin.save();

    return res.json({ success: true, message: 'Admin password updated successfully in MongoDB.' });
  } catch (err) {
    return res.status(500).json({ message: 'Error changing password', error: err.message });
  }
});

// GET /api/auth/system-status
router.get('/system-status', (req, res) => {
  res.json({
    mongoConnected: true,
    cloudinaryConfigured: isCloudinaryConfigured()
  });
});

export default router;
