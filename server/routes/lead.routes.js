import express from 'express';
import mongoose from 'mongoose';
import { Lead } from '../models/Lead.js';

const router = express.Router();

// GET /api/leads
router.get('/', async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving leads', error: err.message });
  }
});

// POST /api/leads
router.post('/', async (req, res) => {
  try {
    const { name, phone, email, customerType, source, capacity, monthlyBill } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ message: 'Name and phone are required.' });
    }

    const customId = `LD-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    const lead = new Lead({
      customId,
      name,
      phone,
      email: email || '',
      customerType: customerType || 'Residential',
      source: source || 'Website',
      status: 'NEW',
      capacity: capacity || '',
      monthlyBill: monthlyBill || '',
      assigned: 'Unassigned',
      notes: []
    });

    await lead.save();
    res.status(201).json(lead);
  } catch (err) {
    res.status(500).json({ message: 'Error submitting lead', error: err.message });
  }
});

// PATCH /api/leads/:id
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let query = { customId: id };
    if (mongoose.Types.ObjectId.isValid(id)) {
      query = { $or: [{ customId: id }, { _id: id }] };
    }

    const updated = await Lead.findOneAndUpdate(query, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating lead', error: err.message });
  }
});

export default router;
