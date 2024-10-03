const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());  // For parsing JSON request bodies
app.use(cors());  // Enable CORS

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));  // Authentication routes
app.use('/api/agency', require('./routes/agencyRoutes'));  // Agency CRUD routes
app.use('/api/admin', require('./routes/adminRoutes'));  // Admin CRUD routes


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
