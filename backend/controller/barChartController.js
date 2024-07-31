const { startOfMonth, endOfMonth } = require('date-fns');  // Ensure date-fns is installed
const Transaction = require('../models/Transaction');  // Adjust the path as necessary

const barChart = async (req, res) => {
  const { month, year } = req.query;
  
  // Validate month input
  if (!month) {
    return res.status(400).json({ message: 'Month query parameter is required' });
  }

   // Validate and default year
   const validYear = parseInt(year, 10);
   const years = isNaN(validYear) ? 2022 : validYear;

  // Convert month name to number (0-11)
  const monthNumber = new Date(Date.parse(`${month} 1, 2022`)).getMonth();
  const start = startOfMonth(new Date(years, monthNumber, 1));
  const end = endOfMonth(start);

  try {
    const ranges = {
      '0-100': [0, 100],
      '101-200': [101, 200],
      '201-300': [201, 300],
      '301-400': [301, 400],
      '401-500': [401, 500],
      '501-600': [501, 600],
      '601-700': [601, 700],
      '701-800': [701, 800],
      '801-900': [801, 900],
      '901-above': [901, Infinity]
    };

    const data = {};

    for (const [range, [min, max]] of Object.entries(ranges)) {
      const count = await Transaction.countDocuments({
        dateOfSale: { $gte: start, $lte: end },
        price: { $gte: min, $lte: max }
      });
      data[range] = count;
    }

    res.json(data);
  } catch (error) {
    console.error('Error fetching bar chart data:', error);  // Log the error for debugging
    res.status(500).json({ message: 'Failed to fetch bar chart data' });
  }
};

module.exports = barChart; 