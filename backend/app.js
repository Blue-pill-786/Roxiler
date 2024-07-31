require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./database');
const Transaction = require('./models/Transaction');
const axios = require('axios');
const PORT = process.env.PORT || 5000;
const app = express();

// Middleware setup
app.use(express.json()); 
app.use(cors());

// Connect to the database
connectDB();

// Route for root path
app.get('/', (req, res) => {
  res.json("hello");
});

// API routes
app.use('/api', require('./routes/index'));

// Initialize route
app.post('/i', async (req, res) => {
  console.log("Initialize");
  try {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    const data = response.data;

    // await Transaction.deleteMany({}); // Clear existing data
    await Transaction.insertMany(data); // Insert new data
    
    res.json({ message: 'Database initialized successfully' });
  } catch (error) {
    console.error('Error initializing database:', error); // Log the error for debugging
    res.status(500).json({ message: 'Failed to initialize database' });
  }
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err); // Log the error
  res.status(500).json({ message: 'Internal server error' });
});

// Start the server

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
