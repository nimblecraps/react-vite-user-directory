const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/students');

const app = express();

// 1. Enable CORS (Make sure this origin matches your Vite frontend port)
app.use(cors({ 
  origin: 'http://localhost:5173' 
}));

app.use(express.json());

// 2. Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);

const PORT = 3000;

// 3. Start server first
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// 4. Connect to MongoDB separately
const dbURI = process.env.MONGO_URI || process.env.DATABASE_URL;

if (!dbURI) {
  console.error('ERROR: MONGO_URI or DATABASE_URL is missing in your .env file!');
} else {
  mongoose.connect(dbURI)
    .then(() => console.log('Successfully connected to MongoDB Atlas!'))
    .catch((err) => console.error('MongoDB connection error:', err.message));
}