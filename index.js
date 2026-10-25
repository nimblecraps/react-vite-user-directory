const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/students'); // Adjust path if your file is named differently

const app = express();

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/students', studentRoutes); // Fixes the 404 Cannot GET /students issue

const PORT = process.env.PORT || 3000;

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI || process.env.DATABASE_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error('MongoDB connection error:', err));