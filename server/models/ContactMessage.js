import mongoose from 'mongoose';

const contactMessageSchema = new mongoose.Schema(
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
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      default: ''
    },
    subject: {
      type: String,
      default: 'General Solar Inquiry'
    },
    message: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['OPEN', 'RESOLVED', 'ARCHIVED'],
      default: 'OPEN'
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

export const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);
