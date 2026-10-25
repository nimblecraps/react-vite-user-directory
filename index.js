<<<<<<< HEAD
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/students'); // Adjust path if your file is named differently
=======
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const studentRoutes = require('./routes/students');
>>>>>>> dfdd47ffc09e6c81906249f270270e0b237bb708

const app = express();

app.use(express.json());
<<<<<<< HEAD

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
=======
app.use('/students', studentRoutes);

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
  });
>>>>>>> dfdd47ffc09e6c81906249f270270e0b237bb708
