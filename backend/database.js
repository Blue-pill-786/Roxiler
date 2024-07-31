const mongoose = require('mongoose');
require('dotenv').config();  

const U = process.env.DATABASE;
const connectDB = async () => {
  
  try {
    await mongoose.connect(U, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB : ', error);
    process.exit(1);
  }
};

module.exports = connectDB;
