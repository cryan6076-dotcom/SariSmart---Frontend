import Transaction from '../models/transaction.js';
import Product from '../models/product.js';

export const getDashboardSummary = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of today

    // 1. Transactions from today
    const todayTransactions = await Transaction.find({
      createdAt: { $gte: today }
    }).sort({ createdAt: -1 });

    // 2. Recent transactions (top 5 overall)
    const recentTransactions = await Transaction.find().sort({ createdAt: -1 }).limit(5);

    // 3. Low stock items
    const lowStockCount = await Product.countDocuments({ stock: { $lte: 5 } });

    // 4. Calculate metrics
    let todaySales = 0;
    let profit = 0;
    const transactionsCount = todayTransactions.length;

    for (const tx of todayTransactions) {
      todaySales += tx.total;
      for (const item of tx.itemsList) {
        const itemProfit = (item.price - (item.cost || 0)) * item.qty;
        profit += itemProfit;
      }
    }

    res.status(200).json({
      todaySales,
      transactionsCount,
      lowStockCount,
      profit,
      recentTransactions
    });
  } catch (error) {
    console.error('Error fetching dashboard summary:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
