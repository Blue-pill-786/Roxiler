const Transaction = require('../models/Transaction');
const { startOfMonth, endOfMonth } = require('date-fns');

const pieChart = async (req, res) => {
    const { month } = req.query;
    if (!month) {
        return res.status(400).json({ message: 'Month query parameter is required' });
    }

    // Convert month name to number (0-11)
    const monthNumber = new Date(Date.parse(`${month} 1, 2022`)).getMonth();
    
    // Define years and corresponding start/end dates
    const year1 = 2022;
    const year2 = 2021;

    const start1 = startOfMonth(new Date(year1, monthNumber, 1));
    const end1 = endOfMonth(start1);
    const start2 = startOfMonth(new Date(year2, monthNumber, 1));
    const end2 = endOfMonth(start2);

    try {
        const categories = await Transaction.aggregate([
            {
                $match: {
                    $or: [
                        { dateOfSale: { $gte: start1, $lte: end1 } },
                        { dateOfSale: { $gte: start2, $lte: end2 } }
                    ]
                }
            },
            {
                $group: { _id: '$category', count: { $sum: 1 } }
            }
        ]);

        // Transform result into an object
        const data = {};
        categories.forEach(cat => data[cat._id] = cat.count);
        res.json(data);
    } catch (error) {
        console.error('Error fetching pie chart data:', error); // Log error for debugging
        res.status(500).json({ message: 'Failed to fetch pie chart data' });
    }
};

module.exports = pieChart;
