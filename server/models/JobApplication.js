import mongoose from 'mongoose';

const jobApplicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  resumeUrl: {
    type: String,
    required: true,
  },
  googleMeetLink: {
    type: String,
  },
  portfolioLink: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Applied', 'Shortlisted', 'Assessment', 'Schedule Interview', 'Schedule HR discussion', 'Selected', 'Reject'],
    default: 'Applied',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const JobApplication = mongoose.model('JobApplication', jobApplicationSchema);
export default JobApplication;
