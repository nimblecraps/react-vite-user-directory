const express = require('express');
const router = express.Router();
const { getEnrollments, createEnrollment } = require('../controllers/enrollmentController');

router.get('/', getEnrollments);
router.post('/', createEnrollment);

module.exports = router;