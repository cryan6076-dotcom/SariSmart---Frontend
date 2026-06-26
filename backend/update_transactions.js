import mongoose from 'mongoose';
import { MONGO_URI } from './src/config.js';
import Transaction from './models/transaction.js';
import Product from './models/product.js';

async function updateTransactions() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    // Load all products into a map
    const products = await Product.find({});
    const productCostMap = {};
    products.forEach(p => {
      productCostMap[p.name] = p.costPrice;
    });

    const transactions = await Transaction.find({});
    let updatedCount = 0;

    for (const tx of transactions) {
      let modified = false;
      for (const item of tx.itemsList) {
        if (item.cost === 0 || item.cost === undefined) {
          const actualCost = productCostMap[item.name];
          if (actualCost !== undefined) {
            item.cost = actualCost;
            modified = true;
          }
        }
      }
      if (modified) {
        await tx.save();
        updatedCount++;
      }
    }

    console.log(`Successfully updated ${updatedCount} transactions.`);
  } catch (error) {
    console.error('Error updating transactions:', error);
  } finally {
    await mongoose.disconnect();
  }
}

updateTransactions();
