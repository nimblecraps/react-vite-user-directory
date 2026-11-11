const Enrollment = require('../models/Enrollment');

// 1. Get all enrollments (with field selection)
const getEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find()
      .populate('studentId', 'name studentNumber email -_id')
      .populate('courseId', 'courseCode title units -_id')
      .exec();

    res.status(200).json({ 
      success: true, 
      count: enrollments.length, 
      data: enrollments 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// 2. Create a new enrollment record
const createEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.create(req.body);
    res.status(201).json({ 
      success: true, 
      data: enrollment 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// 3. Export at the VERY BOTTOM after functions are defined
module.exports = { 
  getEnrollments, 
  createEnrollment 
};