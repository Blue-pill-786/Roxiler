import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data }) => {
  const chartData = {
    labels: Object.keys(data),
    datasets: [{
      label: 'Number of Items',
      data: Object.values(data),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Price Range Distribution</h2>
      <div style={styles.chartWrapper}>
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
                labels: {
                  color: '#333',
                  font: {
                    size: 14
                  }
                }
              },
              title: {
                display: true,
                text: 'Price Range Distribution',
                font: {
                  size: 16
                },
                color: '#333'
              },
              tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                bodyColor: '#fff',
                borderColor: '#333',
                borderWidth: 1
              }
            },
            scales: {
              x: {
                ticks: {
                  color: '#333',
                  font: {
                    size: 12
                  }
                },
                grid: {
                  color: '#ddd'
                }
              },
              y: {
                ticks: {
                  color: '#333',
                  font: {
                    size: 12
                  }
                },
                grid: {
                  color: '#ddd'
                }
              }
            }
          }}
        />
      </div>
    </div>
  );
};

// Inline styles for the BarChart component
const styles = {
  container: {
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '1px 4px 18px rgba(3, 2, 1, 0.8)',
    backgroundColor: '#ffe',
    marginBottom: '20px',
    maxWidth: '800px',
    margin: '10px auto',

  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333'
  },
  chartWrapper: {
    padding: '10px',
    backgroundColor: 'rgba(75, 192, 192, 0.1)',
    borderRadius: '8px',
    
  }
};

export default BarChart;
