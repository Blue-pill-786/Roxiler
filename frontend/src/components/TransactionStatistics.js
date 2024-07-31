import React from 'react';

const TransactionStatistics = ({ statistics }) => {
  return (
    <div>
      <h2>Transaction Statistics</h2>
      <div>
        <p>Total Sales: ${statistics.totalSales || 0}</p>
        <p>Total Sold Items: {statistics.totalSoldItems || 0}</p>
        <p>Total Not Sold Items: {statistics.totalNotSoldItems || 0}</p>
      </div>
    </div>
  );
};

export default TransactionStatistics;
