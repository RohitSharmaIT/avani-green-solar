import express from 'express';
import mongoose from 'mongoose';
import { Project } from '../models/Project.js';
import { deleteFromCloudinary } from '../config/cloudinary.js';

const router = express.Router();

// GET /api/projects - list all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ featured: -1, createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving projects', error: err.message });
  }
});

// GET /api/projects/:id - single project by customId or _id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let project = await Project.findOne({ customId: id });
    if (!project && mongoose.Types.ObjectId.isValid(id)) {
      project = await Project.findById(id);
    }
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving project', error: err.message });
  }
});

// POST /api/projects - add new project (admin)
router.post('/', async (req, res) => {
  try {
    const { name, type, solarType, capacity, location, year, desc, featured, editorialNote, reminder, image, publicId } = req.body;
    if (!name || !location || !capacity) {
      return res.status(400).json({ message: 'Name, location, and capacity are required.' });
    }

    const count = await Project.countDocuments();
    const customId = `p${count + 1}-${Math.random().toString(36).substring(2, 6)}`;

    const project = new Project({
      customId,
      name,
      type: type || 'Residential',
      solarType: solarType || 'On-grid',
      capacity: Number(capacity),
      location,
      year: Number(year) || new Date().getFullYear(),
      desc: desc || '',
      editorialNote: editorialNote || '',
      reminder: reminder || '',
      featured: Boolean(featured),
      image: image || '',
      publicId: publicId || ''
    });

    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: 'Error creating project', error: err.message });
  }
});

// PUT /api/projects/:id - update project
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let query = { customId: id };
    if (mongoose.Types.ObjectId.isValid(id)) {
      query = { $or: [{ customId: id }, { _id: id }] };
    }

    const existing = await Project.findOne(query);
    if (!existing) return res.status(404).json({ message: 'Project not found' });
    const updated = await Project.findOneAndUpdate(query, req.body, { new: true, runValidators: true });
    if (existing.publicId && existing.publicId !== (req.body.publicId || existing.publicId)) {
      await deleteFromCloudinary(existing.publicId);
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating project', error: err.message });
  }
});

// DELETE /api/projects/:id - delete project
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let query = { customId: id };
    if (mongoose.Types.ObjectId.isValid(id)) {
      query = { $or: [{ customId: id }, { _id: id }] };
    }

    const deleted = await Project.findOneAndDelete(query);
    if (!deleted) {
      return res.status(404).json({ message: 'Project not found' });
    }
    if (deleted.publicId) await deleteFromCloudinary(deleted.publicId);
    res.json({ success: true, message: 'Project deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting project', error: err.message });
  }
});

export default router;
