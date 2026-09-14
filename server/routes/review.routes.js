import express from 'express';
import mongoose from 'mongoose';
import { Review } from '../models/Review.js';

const router = express.Router();

// GET /api/reviews
router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const reviews = await Review.find(filter).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving reviews', error: err.message });
  }
});

// POST /api/reviews - submit new review (starts as PENDING)
router.post('/', async (req, res) => {
  try {
    const { name, location, rating, text, capacity } = req.body;
    if (!name || !text) {
      return res.status(400).json({ message: 'Name and review text are required.' });
    }

    const customId = `rv-${Math.random().toString(36).substring(2, 8)}`;
    const review = new Review({
      customId,
      name,
      location: location || 'Madhya Pradesh',
      rating: Number(rating) || 5,
      text,
      capacity: capacity || '',
      status: 'PENDING'
    });

    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: 'Error submitting review', error: err.message });
  }
});

// PATCH /api/reviews/:id/status
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    let query = { customId: id };
    if (mongoose.Types.ObjectId.isValid(id)) {
      query = { $or: [{ customId: id }, { _id: id }] };
    }

    const updated = await Review.findOneAndUpdate(query, { status }, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating review', error: err.message });
  }
});

// DELETE /api/reviews/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let query = { customId: id };
    if (mongoose.Types.ObjectId.isValid(id)) {
      query = { $or: [{ customId: id }, { _id: id }] };
    }

    const deleted = await Review.findOneAndDelete(query);
    if (!deleted) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.json({ success: true, message: 'Review deleted.' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting review', error: err.message });
  }
});

export default router;
