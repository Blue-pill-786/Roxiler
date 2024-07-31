
const Transaction = require('../models/Transaction');
const { startOfMonth, endOfMonth } = require('date-fns');


const statistics = async (req, res) => {
    const { month, year } = req.query;
    const monthNumber = new Date(Date.parse(`${month} 1, 2022`)).getMonth();
    const years =year || 2022
    const start = startOfMonth(new Date(years, monthNumber, 1));
    const end = endOfMonth(start);
    
  
    try {
      const totalSales = await Transaction.aggregate([
        { $match: { dateOfSale: { $gte: start, $lte: end }, sold: true } },
        { $group: { _id: null, totalSales: { $sum: '$price' } } }
      ]);
  
      const totalSoldItems = await Transaction.countDocuments({
        dateOfSale: { $gte: start, $lte: end },
        sold: true
      });
  
      const totalNotSoldItems = await Transaction.countDocuments({
        dateOfSale: { $gte: start, $lte: end },
        sold: false
      });
  
      res.json({
        total_sales: totalSales[0] ? totalSales[0].totalSales : 0,
        total_sold_items: totalSoldItems,
        total_not_sold_items: totalNotSoldItems
      });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch statistics' });
    }
  }
  module.exports = statistics;