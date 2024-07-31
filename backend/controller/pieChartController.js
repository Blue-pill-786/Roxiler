
const Transaction = require('../models/Transaction');
const { startOfMonth, endOfMonth } = require('date-fns');

const pieChart = async (req, res) => {
    const { month, year } = req.query;
    const monthNumber = new Date(Date.parse(`${month} 1, 2022`)).getMonth();
    
    const validYear = parseInt(year, 10);
    const years = isNaN(validYear) ? new Date().getFullYear() : validYear;
  
    const start = startOfMonth(new Date(years, monthNumber, 1));
    const end = endOfMonth(start);
  
    try {
      const categories = await Transaction.aggregate([
        { $match: { dateOfSale: { $gte: start, $lte: end } } },
        { $group: { _id: '$category', count: { $sum: 1 } } }
      ]);
  
      const data = {};
      categories.forEach(cat => data[cat._id] = cat.count);
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch pie chart data' });
    }
  }

  module.exports = pieChart;