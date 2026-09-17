import express from 'express';
import multer from 'multer';
import JobApplication from '../models/JobApplication.js';
import { uploadToCloudinary } from '../config/cloudinary.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Get all applications (Admin)
router.get('/', async (req, res) => {
  try {
    const applications = await JobApplication.find().populate('jobId', 'role location').sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching applications', error: error.message });
  }
});

// Submit a new application
router.post('/', upload.single('resume'), async (req, res) => {
  try {
    const { jobId, name, phone, email, googleMeetLink, portfolioLink } = req.body;
    let resumeUrl = '';

    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.buffer, {
        resource_type: 'raw',
        format: req.file.originalname.split('.').pop(),
      });
      resumeUrl = uploadResult.url;
    } else {
      return res.status(400).json({ message: 'Resume is required' });
    }

    const newApplication = new JobApplication({
      jobId,
      name,
      phone,
      email,
      resumeUrl,
      googleMeetLink,
      portfolioLink,
    });

    const savedApplication = await newApplication.save();
    res.status(201).json(savedApplication);
  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({ message: 'Error submitting application', error: error.message });
  }
});

// Update application status (Admin)
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const application = await JobApplication.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!application) return res.status(404).json({ message: 'Application not found' });
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: 'Error updating application status', error: error.message });
  }
});

export default router;
