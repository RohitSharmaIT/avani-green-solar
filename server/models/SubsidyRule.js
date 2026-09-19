import mongoose from 'mongoose';

const subsidyRuleSchema = new mongoose.Schema(
  {
    customId: { type: String, unique: true, sparse: true },
    scheme: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    customerType: { type: String, required: true, trim: true },
    solarType: { type: String, default: 'On-grid', trim: true },
    min: { type: Number, required: true, min: 0 },
    max: { type: Number, required: true, min: 0 },
    type: { type: String, required: true, trim: true },
    value: { type: Number, required: true, min: 0 },
    cap: { type: Number, required: true, min: 0 }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret.customId || ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    }
  }
);

export const SubsidyRule = mongoose.model('SubsidyRule', subsidyRuleSchema);
