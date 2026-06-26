import Transaction from '../models/transaction.js';
import Product from '../models/product.js';

export const getInsights = async (req, res) => {
  try {
    const { timeframe = 'TODAY' } = req.query;
    const now = new Date();
    let startDate = new Date();

    if (timeframe === 'TODAY') {
      startDate.setHours(0, 0, 0, 0);
    } else if (timeframe === 'WEEK') {
      startDate.setDate(now.getDate() - 6);
      startDate.setHours(0, 0, 0, 0);
    } else if (timeframe === 'MONTH') {
      startDate.setDate(now.getDate() - 29);
      startDate.setHours(0, 0, 0, 0);
    }

    const transactions = await Transaction.find({
      createdAt: { $gte: startDate }
    });

    let totalRevenue = 0;
    let netProfit = 0;
    const productStats = {};
    const chartMap = {};

    const products = await Product.find({}, 'name category image');
    const productMeta = {};
    products.forEach(p => {
      productMeta[p.name] = { category: p.category, image: p.image };
    });

    transactions.forEach(tx => {
      totalRevenue += tx.total;

      // Group chart data
      const dateObj = new Date(tx.createdAt);
      let timeKey = '';
      if (timeframe === 'TODAY') {
        timeKey = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      } else {
        timeKey = dateObj.toLocaleDateString([], { month: 'short', day: 'numeric' });
      }

      if (!chartMap[timeKey]) chartMap[timeKey] = 0;
      chartMap[timeKey] += tx.total;

      tx.itemsList.forEach(item => {
        const cost = item.cost || 0;
        const profit = (item.price - cost) * item.qty;
        netProfit += profit;

        if (!productStats[item.name]) {
          const meta = productMeta[item.name] || {};
          productStats[item.name] = {
            name: item.name,
            category: meta.category || item.category || 'General',
            image: meta.image || null,
            revenue: 0,
            qtySold: 0
          };
        }
        productStats[item.name].revenue += item.price * item.qty;
        productStats[item.name].qtySold += item.qty;
      });
    });

    // Format chart data for recharts
    const chartData = Object.keys(chartMap).map(key => ({
      name: key,
      revenue: chartMap[key]
    }));

    // Sort products by revenue descending
    const topProducts = Object.values(productStats)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 3); // Top 3

    res.status(200).json({
      totalRevenue,
      netProfit,
      topProducts,
      chartData
    });
  } catch (error) {
    console.error('Error fetching insights:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
