const express = require('express');
const router = express.Router();
const { getCourseAnalytics } = require('../controllers/statsController');

router.get('/course-analytics', getCourseAnalytics);

module.exports = router;