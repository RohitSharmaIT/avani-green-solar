import express from 'express';
import mongoose from 'mongoose';
import { Blog } from '../models/Blog.js';

const router = express.Router();

// GET /api/blog - list all blog articles
router.get('/', async (req, res) => {
  try {
    const articles = await Blog.find().sort({ date: -1, createdAt: -1 });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving blog posts', error: err.message });
  }
});

// GET /api/blog/:slug - get single article by slug or id
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    let article = await Blog.findOne({ slug });
    if (!article) {
      article = await Blog.findOne({ customId: slug });
    }
    if (!article && mongoose.Types.ObjectId.isValid(slug)) {
      article = await Blog.findById(slug);
    }
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json(article);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving article', error: err.message });
  }
});

// POST /api/blog - add new blog article
router.post('/', async (req, res) => {
  try {
    const { title, cat, excerpt, content, image, publicId, slug: customSlug } = req.body;
    if (!title || !excerpt || !content) {
      return res.status(400).json({ message: 'Title, excerpt, and content are required.' });
    }

    const generatedSlug = (customSlug || title)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Check slug uniqueness
    let finalSlug = generatedSlug || `post-${Date.now()}`;
    const slugExists = await Blog.findOne({ slug: finalSlug });
    if (slugExists) {
      finalSlug = `${finalSlug}-${Math.random().toString(36).substring(2, 6)}`;
    }

    const count = await Blog.countDocuments();
    const customId = `b${count + 1}`;

    const blog = new Blog({
      customId,
      title,
      slug: finalSlug,
      cat: cat || 'Solar Basics',
      excerpt,
      content,
      image: image || '',
      publicId: publicId || '',
      date: new Date()
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Error creating blog post', error: err.message });
  }
});

// PUT /api/blog/:id - update blog article
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let query = { $or: [{ slug: id }, { customId: id }] };
    if (mongoose.Types.ObjectId.isValid(id)) {
      query.$or.push({ _id: id });
    }

    const updated = await Blog.findOneAndUpdate(query, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating blog post', error: err.message });
  }
});

// DELETE /api/blog/:id - delete blog article
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let query = { $or: [{ slug: id }, { customId: id }] };
    if (mongoose.Types.ObjectId.isValid(id)) {
      query.$or.push({ _id: id });
    }

    const deleted = await Blog.findOneAndDelete(query);
    if (!deleted) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json({ success: true, message: 'Article deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting blog post', error: err.message });
  }
});

export default router;
