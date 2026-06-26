import mongoose from 'mongoose';

const stockHistorySchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  change: { type: Number, required: true },
  type: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

export default mongoose.model('StockHistory', stockHistorySchema);
