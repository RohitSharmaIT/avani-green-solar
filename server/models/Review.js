import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
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
    location: {
      type: String,
      default: 'Madhya Pradesh'
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5
    },
    text: {
      type: String,
      required: true
    },
    capacity: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      enum: ['PENDING', 'APPROVED', 'REJECTED'],
      default: 'PENDING'
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

export const Review = mongoose.model('Review', reviewSchema);
