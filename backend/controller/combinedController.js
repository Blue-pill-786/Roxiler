
const combined = async (req, res) => {
    try {
      const month = req.query.month;
      const [transactionsResponse, statisticsResponse, barChartResponse, pieChartResponse] = await Promise.all([
        axios.get(`http://localhost:5000/api/transactions?month=${month}`),
        axios.get(`http://localhost:5000/api/statistics?month=${month}`),
        axios.get(`http://localhost:5000/api/bar_chart?month=${month}`),
        axios.get(`http://localhost:5000/api/pie_chart?month=${month}`)
      ]);
  
      const combinedData = {
        transactions: transactionsResponse.data,
        statistics: statisticsResponse.data,
        bar_chart: barChartResponse.data,
        pie_chart: pieChartResponse.data
      };
  
      res.json(combinedData);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  }

  module.exports = combined;