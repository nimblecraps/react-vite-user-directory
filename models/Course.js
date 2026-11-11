const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseCode: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  units: { type: Number, required: true, default: 3 }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);