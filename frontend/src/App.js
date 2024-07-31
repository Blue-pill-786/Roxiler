import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionsTable from './components/TransactionsTable';
import TransactionStatistics from './components/TransactionStatistics';
import BarChart from './components/BarChart';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [month, setMonth] = useState('March');
  const [statistics, setStatistics] = useState({});
  const [barChartData, setBarChartData] = useState({});
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const baseUrl = 'http://localhost:5000';

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/transactions?month=${month}&search=${search}&page=${currentPage}`);
      setTransactions(response.data.transactions);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const fetchStatistics = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/statistics?month=${month}`);
      setStatistics(response.data);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  const fetchBarChart = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/bar_chart?month=${month}`);
      setBarChartData(response.data);
    } catch (error) {
      console.error('Error fetching bar chart data:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await Promise.all([fetchTransactions(), fetchStatistics(), fetchBarChart()]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoading(false);
    };

    fetchData();
  }, [month, search, currentPage]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Transaction Dashboard</h1>

      <div style={styles.controls}>
        <label style={styles.label}>
          Select Month:
          <select 
            value={month} 
            onChange={e => setMonth(e.target.value)}
            style={styles.select}
          >
            {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </label>
        <input
          type="text"
          placeholder="Search transactions..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={styles.searchInput}
        />
      </div>
      <div style={styles.tableContainer}>
        <TransactionsTable
          transactions={transactions}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          loading={loading}
        />
      </div>

      <div style={styles.statisticsContainer}>
        <TransactionStatistics statistics={statistics} />
      </div>

      

      <div style={styles.chartContainer}>
        <BarChart data={barChartData} />
      </div>
    </div>
  );
};

// Inline styles for the App component
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  controls: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  label: {
    fontSize: '16px',
  },
  select: {
    marginLeft: '10px',
    padding: '5px',
    fontSize: '16px',
  },
  searchInput: {
    padding: '8px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  statisticsContainer: {
    marginBottom: '20px',
  },
  tableContainer: {
    marginBottom: '20px',
  },
  chartContainer: {
    marginTop: '20px',
  },
};

export default App;