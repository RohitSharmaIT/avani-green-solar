import mongoose from 'mongoose';

const siteVisitSchema = new mongoose.Schema(
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
    address: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      default: ''
    },
    email: {
      type: String,
      default: ''
    },
    preferredDate: {
      type: String,
      default: ''
    },
    preferredTime: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      enum: ['REQUESTED', 'CONFIRMED', 'COMPLETED', 'CANCELLED'],
      default: 'REQUESTED'
    },
    leadId: {
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

export const SiteVisit = mongoose.model('SiteVisit', siteVisitSchema);
