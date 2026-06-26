import Transaction from '../models/transaction.js';
import Product from '../models/product.js';

// GET /api/transactions
export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// POST /api/transactions
export const createTransaction = async (req, res) => {
  try {
    const { itemsList, total, amountGiven, change } = req.body;

    // Optional: generate a simple transaction number
    const count = await Transaction.countDocuments();
    const number = `TXN-${String(count + 1).padStart(4, '0')}`;

    const newTransaction = new Transaction({
      itemsList,
      total,
      amountGiven,
      change,
      number
    });

    await newTransaction.save();

    // Deduct stock for each product
    for (const item of itemsList) {
      if (item._id) {
        await Product.findByIdAndUpdate(item._id, {
          $inc: { stock: -item.qty }
        });
        
        // Record stock history
        const StockHistory = (await import('../models/stockHistory.js')).default;
        await new StockHistory({
          productId: item._id,
          change: -item.qty,
          type: "Sold"
        }).save();
      }
    }

    res.status(201).json(newTransaction);
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
