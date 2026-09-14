import express from 'express';
import { ContactMessage } from '../models/ContactMessage.js';

const router = express.Router();

// GET /api/contact
router.get('/', async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving messages', error: err.message });
  }
});

// POST /api/contact
router.post('/', async (req, res) => {
  try {
    const { name, phone, email, subject, message } = req.body;
    if (!name || !phone || !message) {
      return res.status(400).json({ message: 'Name, phone, and message are required.' });
    }

    const customId = `msg-${Math.random().toString(36).substring(2, 7)}`;
    const msg = new ContactMessage({
      customId,
      name,
      phone,
      email: email || '',
      subject: subject || 'General Inquiry',
      message,
      status: 'OPEN'
    });

    await msg.save();
    res.status(201).json(msg);
  } catch (err) {
    res.status(500).json({ message: 'Error submitting message', error: err.message });
  }
});

export default router;
