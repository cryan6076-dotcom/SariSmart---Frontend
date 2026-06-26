import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  itemsList: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      name: { type: String, required: true },
      qty: { type: Number, required: true },
      price: { type: Number, required: true },
      cost: { type: Number, default: 0 }
    }
  ],
  total: {
    type: Number,
    required: true
  },
  amountGiven: {
    type: Number,
    required: true
  },
  change: {
    type: Number,
    required: true
  },
  number: {
    type: String,
    required: true
  }
}, { timestamps: true });

export default mongoose.model('Transaction', transactionSchema);
