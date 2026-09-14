import express from 'express';
import { Settings } from '../models/Settings.js';

const router = express.Router();

// GET /api/settings
router.get('/', async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving settings', error: err.message });
  }
});

// PUT /api/settings
router.put('/', async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings(req.body);
    } else {
      Object.assign(settings, req.body);
    }
    await settings.save();
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: 'Error updating settings', error: err.message });
  }
});

export default router;
