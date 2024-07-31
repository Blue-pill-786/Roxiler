require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.DATABASE_URL;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected successfully'))
.catch(err => console.error('Connection error', err));
