const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: '*', // Allow all origins for development/testing, can restrict later
  credentials: true
}));
app.use(express.json());

// Basic Route / Health Check
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    message: '🛡️ CyberGuardians Backend API is running successfully!',
    timestamp: new Date()
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'UP',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;

if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI)
    .then(() => {
      console.log('💚 Connected to MongoDB database successfully.');
    })
    .catch((err) => {
      console.error('❌ MongoDB database connection error:', err.message);
    });
} else {
  console.warn('⚠️ WARNING: MONGODB_URI is not defined in the environment variables. Database integration is disabled.');
}

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is listening on port ${PORT}...`);
});
