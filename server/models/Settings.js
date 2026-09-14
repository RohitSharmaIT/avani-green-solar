import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      default: 'Avani Green Solar'
    },
    phone: {
      type: String,
      default: '+91 90000 00000'
    },
    whatsapp: {
      type: String,
      default: '919000000000'
    },
    email: {
      type: String,
      default: 'hello@avanigreensolar.example'
    },
    address: {
      type: String,
      default: 'Bhopal, Madhya Pradesh, India'
    },
    hours: {
      type: String,
      default: 'Mon–Sat, 9:30 AM – 6:30 PM'
    },
    defaultState: {
      type: String,
      default: 'Madhya Pradesh'
    },
    tariffPerUnit: {
      type: Number,
      default: 7.5
    },
    unitsPerKwPerMonth: {
      type: Number,
      default: 120
    },
    costPerKw: {
      type: Number,
      default: 55000
    }
  },
  { timestamps: true }
);

export const Settings = mongoose.model('Settings', settingsSchema);
