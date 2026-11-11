const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/students');
const uploadRoutes = require('./routes/upload');
const enrollmentRoutes = require('./routes/enrollmentRoutes'); // Import enrollment routes
const statsRoutes = require('./routes/statsRoutes');          // Import stats routes
const courseRoutes = require('./routes/courseRoutes');
const app = express();

// 1. Enable CORS (Matches Vite frontend port)
app.use(cors({ 
  origin: 'http://localhost:5173' 
}));

app.use(express.json());

// 2. Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/enrollments', enrollmentRoutes); // Registered /api/enrollments endpoint
app.use('/api/stats', statsRoutes);
app.use('/api/courses', courseRoutes); // Registered /api/courses endpoint
const PORT = 3000;

// 3. Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// 4. Connect to MongoDB
const dbURI = process.env.MONGO_URI || process.env.DATABASE_URL;

if (!dbURI) {
  console.error('ERROR: MONGO_URI or DATABASE_URL is missing in your .env file!');
} else {
  mongoose.connect(dbURI)
    .then(() => console.log('Successfully connected to MongoDB Atlas!'))
    .catch((err) => console.error('MongoDB connection error:', err.message));
}