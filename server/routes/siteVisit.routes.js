import express from 'express';
import mongoose from 'mongoose';
import { SiteVisit } from '../models/SiteVisit.js';
import { Lead } from '../models/Lead.js';

const router = express.Router();

// GET /api/site-visits
router.get('/', async (req, res) => {
  try {
    const visits = await SiteVisit.find().sort({ createdAt: -1 });
    res.json(visits);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving site visits', error: err.message });
  }
});

// POST /api/site-visits
router.post('/', async (req, res) => {
  try {
    const { name, address, phone, email, preferredDate, preferredTime } = req.body;
    if (!name || !address) {
      return res.status(400).json({ message: 'Name and address are required.' });
    }

    // Automatically create a corresponding lead in MongoDB
    const leadCustomId = `LD-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const lead = new Lead({
      customId: leadCustomId,
      name,
      phone: phone || '',
      email: email || '',
      source: 'Site Visit',
      status: 'SITE_VISIT_SCHEDULED'
    });
    await lead.save();

    const visitCustomId = `SV-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const visit = new SiteVisit({
      customId: visitCustomId,
      name,
      address,
      phone: phone || '',
      email: email || '',
      preferredDate: preferredDate || '',
      preferredTime: preferredTime || '',
      status: 'REQUESTED',
      leadId: leadCustomId
    });

    await visit.save();
    res.status(201).json(visit);
  } catch (err) {
    res.status(500).json({ message: 'Error scheduling site visit', error: err.message });
  }
});

// PATCH /api/site-visits/:id
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let query = { customId: id };
    if (mongoose.Types.ObjectId.isValid(id)) {
      query = { $or: [{ customId: id }, { _id: id }] };
    }

    const updated = await SiteVisit.findOneAndUpdate(query, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Site visit not found' });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating site visit', error: err.message });
  }
});

export default router;
