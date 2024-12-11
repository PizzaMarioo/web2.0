const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Initialize dotenv to use .env variables
dotenv.config();

const app = express();
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Enable parsing of JSON requests

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Import routes
const authRoutes = require('./routes/auth');
const menuRoutes = require('./routes/menu');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
