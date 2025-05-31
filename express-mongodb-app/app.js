require('dotenv').config(); // Має бути на самому початку

const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Для дебагу — перевіримо URI:
console.log('Mongo URI:', process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
    app.listen(3000, () => console.log('🚀 Server is running on port 3000'));
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error.message);
  });
