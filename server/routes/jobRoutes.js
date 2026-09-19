import express from 'express';
import mongoose from 'mongoose';
import Job from '../models/Job.js';
import { deleteFromCloudinary } from '../config/cloudinary.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    res.json(await Job.find().sort({ createdAt: -1 }));
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs', error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const job = mongoose.Types.ObjectId.isValid(req.params.id) ? await Job.findById(req.params.id) : null;
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching job', error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { role, location, salary, image, publicId, responsibilities, requirements, editorialNote, reminder } = req.body;
    if (!role || !location || !salary || !responsibilities || !requirements) {
      return res.status(400).json({ message: 'Role, location, salary, responsibilities, and requirements are required.' });
    }
    const job = await Job.create({ role, location, salary, image, publicId, responsibilities, requirements, editorialNote, reminder });
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ message: 'Error creating job', error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { role, location, salary, image, publicId, responsibilities, requirements, editorialNote, reminder } = req.body;
    const existing = await Job.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: 'Job not found' });
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { role, location, salary, image, publicId, responsibilities, requirements, editorialNote, reminder },
      { new: true, runValidators: true }
    );
    if (existing.publicId && existing.publicId !== (publicId || '')) await deleteFromCloudinary(existing.publicId);
    res.json(job);
  } catch (error) {
    res.status(400).json({ message: 'Error updating job', error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    if (job.publicId) await deleteFromCloudinary(job.publicId);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting job', error: error.message });
  }
});

export default router;
