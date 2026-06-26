import mongoose from 'mongoose';

const stockHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  change: { type: Number, required: true },
  type: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

export default mongoose.model('StockHistory', stockHistorySchema);
