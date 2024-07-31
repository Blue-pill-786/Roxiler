const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const { startOfMonth, endOfMonth, format } = require('date-fns');

router.get('/', async (req, res) => {
  const { month, search = '', page = 1, per_page = 10, year } = req.query;
  const monthNumber = new Date(Date.parse(`${month} 1, 2022`)).getMonth();
  const years = year || 2022
  const start = startOfMonth(new Date(years, monthNumber, 1));
  const end = endOfMonth(start);
  

  try {
    const transactions = await Transaction.find({
      dateOfSale: { $gte: start, $lte: end },
      $or: [
        { title: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
        { price: search ? parseFloat(search) : { $exists: true } }
      ]
    })
    .skip((page - 1) * per_page)
    .limit(parseInt(per_page));
    
    const total = await Transaction.countDocuments({
      dateOfSale: { $gte: start, $lte: end },
      $or: [
        { title: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
        { price: search ? parseFloat(search) : { $exists: true } }
      ]
    });
   
    res.json({
      transactions,
      total,
      pages: Math.ceil(total / per_page),
      current_page: page
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch transactions' });
  }
});

module.exports = router;
