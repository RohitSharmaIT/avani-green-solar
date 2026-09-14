import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    customId: {
      type: String,
      unique: true,
      sparse: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    cat: {
      type: String,
      required: true,
      default: 'Solar Basics'
    },
    excerpt: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    image: {
      type: String,
      default: ''
    },
    publicId: {
      type: String,
      default: ''
    },
    date: {
      type: Date,
      default: Date.now
    },
    author: {
      type: String,
      default: 'Avani Green Solar Technical Team'
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

export const Blog = mongoose.model('Blog', blogSchema);
