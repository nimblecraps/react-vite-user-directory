// controllers/statsController.js
const Enrollment = require('../models/Enrollment');

/**
 * @desc    Get top enrolled courses analytics
 * @route   GET /api/stats/course-analytics
 * @access  Public / Admin
 */
const getCourseAnalytics = async (req, res) => {
  try {
    const stats = await Enrollment.aggregate([
      // Stage 1: Filter active enrollments only
      {
        $match: { 
          status: 'Enrolled' 
        }
      },

      // Stage 2: Group by courseId and sum total enrolled students
      {
        $group: {
          _id: '$courseId',
          totalEnrolledStudents: { $sum: 1 }
        }
      },

      // Stage 3: Perform $lookup to join with the 'courses' collection
      {
        $lookup: {
          from: 'courses',           // Collection name in MongoDB (usually lowercase & pluralized)
          localField: '_id',
          foreignField: '_id',
          as: 'courseDetails'
        }
      },

      // Stage 4: Deconstruct the courseDetails array into a flat object
      {
        $unwind: '$courseDetails'
      },

      // Stage 5: Sort by highest number of enrolled students descending
      {
        $sort: { 
          totalEnrolledStudents: -1 
        }
      },

      // Stage 6: Project clean response formatting
      {
        $project: {
          _id: 0,
          courseId: '$_id',
          courseCode: '$courseDetails.courseCode',
          courseTitle: '$courseDetails.title',
          totalEnrolledStudents: 1
        }
      }
    ]);

    return res.status(200).json({
      success: true,
      count: stats.length,
      data: stats
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve course analytics.',
      error: error.message
    });
  }
};

module.exports = {
  getCourseAnalytics
};