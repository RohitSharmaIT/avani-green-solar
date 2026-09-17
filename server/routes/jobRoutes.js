import express from 'express';
import Job from '../models/Job.js';

const router = express.Router();

// Get all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs', error: error.message });
  }
});

// Create a new job
router.post('/', async (req, res) => {
  try {
    const { role, location, salary, image, responsibilities, requirements } = req.body;
    
    const newJob = new Job({
      role,
      location,
      salary,
      image,
      responsibilities,
      requirements,
    });

    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(500).json({ message: 'Error creating job', error: error.message });
  }
});

export default router;
