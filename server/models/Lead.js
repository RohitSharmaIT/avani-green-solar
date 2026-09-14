import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema(
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
      required: true,
      trim: true
    },
    email: {
      type: String,
      trim: true,
      default: ''
    },
    customerType: {
      type: String,
      default: 'Residential'
    },
    source: {
      type: String,
      default: 'Website'
    },
    status: {
      type: String,
      enum: ['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL_SENT', 'SITE_VISIT_SCHEDULED', 'WON', 'LOST'],
      default: 'NEW'
    },
    capacity: {
      type: String,
      default: ''
    },
    monthlyBill: {
      type: String,
      default: ''
    },
    assigned: {
      type: String,
      default: 'Unassigned'
    },
    notes: [
      {
        text: String,
        author: { type: String, default: 'Admin' },
        createdAt: { type: Date, default: Date.now }
      }
    ]
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

export const Lead = mongoose.model('Lead', leadSchema);
