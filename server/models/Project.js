import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    customId: {
      type: String,
      unique: true,
      sparse: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    type: {
      type: String,
      required: true,
      enum: ['Residential', 'Commercial', 'Industrial'],
      default: 'Residential'
    },
    solarType: {
      type: String,
      required: true,
      enum: ['On-grid', 'Off-grid', 'Hybrid'],
      default: 'On-grid'
    },
    capacity: {
      type: Number,
      required: true,
      min: 0.1
    },
    location: {
      type: String,
      required: true,
      trim: true
    },
    year: {
      type: Number,
      default: () => new Date().getFullYear()
    },
    desc: {
      type: String,
      default: ''
    },
    editorialNote: { type: String, default: '' },
    reminder: { type: String, default: '' },
    featured: {
      type: Boolean,
      default: false
    },
    image: {
      type: String,
      default: ''
    },
    publicId: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret.customId || ret._id.toString();
        return ret;
      }
    }
  }
);

export const Project = mongoose.model('Project', projectSchema);
