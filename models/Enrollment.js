const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  semester: { type: String, required: true },
  schoolYear: { type: String, required: true },
  status: { type: String, enum: ['Enrolled', 'Completed', 'Dropped'], default: 'Enrolled' },
  grade: { type: Number, default: null }
}, { timestamps: true });

// Export the model so your controllers can use it
module.exports = mongoose.model('Enrollment', enrollmentSchema);