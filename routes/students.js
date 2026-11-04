const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const requireAuth = require('../middleware/auth');

// 1. SEED ROUTE (Includes required email field)
router.get('/seed-data', async (req, res) => {
  try {
    await Student.deleteMany({}); // Clears existing records
    const sample = await Student.insertMany([
      { name: "Charlie", course: "BSIT - 3", email: "charlie@example.com" },
      { name: "Alice Smith", course: "BSCS - 2", email: "alice@example.com" },
      { name: "Bob Jones", course: "BSIS - 4", email: "bob@example.com" }
    ]);
    res.json({ message: "Seeded successfully!", sample });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. GET ALL STUDENTS (Protected route)
router.get('/', requireAuth, async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. CREATE STUDENT
router.post('/', requireAuth, async (req, res) => {
  try {
    const newStudent = await Student.create(req.body);
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 4. UPDATE STUDENT BY ID
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 5. DELETE STUDENT BY ID
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json({ message: 'Student deleted successfully', deletedStudent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;