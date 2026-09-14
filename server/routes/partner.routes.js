import express from 'express';
import mongoose from 'mongoose';
import { DealerApp, ContractorApp } from '../models/Partner.js';

const router = express.Router();

// GET /api/partners/dealers
router.get('/dealers', async (req, res) => {
  try {
    const dealers = await DealerApp.find().sort({ createdAt: -1 });
    res.json(dealers);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving dealer applications', error: err.message });
  }
});

// POST /api/partners/dealers
router.post('/dealers', async (req, res) => {
  try {
    const { name, city, phone, email, firmName, experience, turnover } = req.body;
    if (!name || !city || !phone) {
      return res.status(400).json({ message: 'Name, city, and phone are required.' });
    }

    const customId = `DL-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
    const dealer = new DealerApp({
      customId,
      name,
      city,
      phone,
      email: email || '',
      firmName: firmName || '',
      experience: experience || '',
      turnover: turnover || '',
      status: 'APPLIED'
    });

    await dealer.save();
    res.status(201).json(dealer);
  } catch (err) {
    res.status(500).json({ message: 'Error submitting dealer application', error: err.message });
  }
});

// PATCH /api/partners/dealers/:id
router.patch('/dealers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let query = { customId: id };
    if (mongoose.Types.ObjectId.isValid(id)) {
      query = { $or: [{ customId: id }, { _id: id }] };
    }

    const updated = await DealerApp.findOneAndUpdate(query, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Dealer application not found' });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating dealer application', error: err.message });
  }
});

// GET /api/partners/contractors
router.get('/contractors', async (req, res) => {
  try {
    const contractors = await ContractorApp.find().sort({ createdAt: -1 });
    res.json(contractors);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving contractor applications', error: err.message });
  }
});

// POST /api/partners/contractors
router.post('/contractors', async (req, res) => {
  try {
    const { name, city, phone, email, teamSize, experience, specialisation } = req.body;
    if (!name || !city || !phone) {
      return res.status(400).json({ message: 'Name, city, and phone are required.' });
    }

    const customId = `CT-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
    const contractor = new ContractorApp({
      customId,
      name,
      city,
      phone,
      email: email || '',
      teamSize: teamSize || '',
      experience: experience || '',
      specialisation: specialisation || '',
      status: 'APPLIED'
    });

    await contractor.save();
    res.status(201).json(contractor);
  } catch (err) {
    res.status(500).json({ message: 'Error submitting contractor application', error: err.message });
  }
});

// PATCH /api/partners/contractors/:id
router.patch('/contractors/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let query = { customId: id };
    if (mongoose.Types.ObjectId.isValid(id)) {
      query = { $or: [{ customId: id }, { _id: id }] };
    }

    const updated = await ContractorApp.findOneAndUpdate(query, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Contractor application not found' });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating contractor application', error: err.message });
  }
});

export default router;
