import mongoose from 'mongoose';

const dealerAppSchema = new mongoose.Schema(
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
    city: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      default: ''
    },
    firmName: {
      type: String,
      default: ''
    },
    experience: {
      type: String,
      default: ''
    },
    turnover: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      enum: ['APPLIED', 'IN_REVIEW', 'APPROVED', 'REJECTED'],
      default: 'APPLIED'
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

const contractorAppSchema = new mongoose.Schema(
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
    city: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      default: ''
    },
    teamSize: {
      type: String,
      default: ''
    },
    experience: {
      type: String,
      default: ''
    },
    specialisation: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      enum: ['APPLIED', 'IN_REVIEW', 'APPROVED', 'REJECTED'],
      default: 'APPLIED'
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

export const DealerApp = mongoose.model('DealerApp', dealerAppSchema);
export const ContractorApp = mongoose.model('ContractorApp', contractorAppSchema);
