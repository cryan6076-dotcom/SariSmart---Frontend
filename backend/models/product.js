import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  costPrice: {
    type: Number,
    default: 0,
  },
  stock: {
    type: Number,
    required: true,
  },
  restockThreshold: {
    type: Number,
    default: 5,
  },
  image: {
    type: String, // Stores the image URL or static file path
    default: null,
  }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
