import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: '',
  },
  publicId: {
    type: String,
    default: '',
  },
  responsibilities: {
    type: String,
    required: true,
  },
  requirements: {
    type: String,
    required: true,
  },
  editorialNote: {
    type: String,
    default: '',
  },
  reminder: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Job = mongoose.model('Job', jobSchema);
export default Job;
