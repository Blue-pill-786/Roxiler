import React from 'react';

const TransactionStatistics = ({ statistics }) => {
  
  return (
    <div>
      <h2>Transaction Statistics</h2>
      <div>
        <p>Total Sales: ${statistics.total_sales|| 0}</p>
        <p>Total Sold Items: {statistics.total_sold_items || 0}</p>
        <p>Total Not Sold Items: {statistics.total_not_sold_items || 0}</p>
      </div>
    </div>
  );
};

export default TransactionStatistics;
