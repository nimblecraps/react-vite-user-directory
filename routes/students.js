<<<<<<< HEAD
const requireAuth = require('../middleware/auth');
require('dotenv').config();
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']); // Add this line to fix ECONNREFUSED DNS resolution

const mongoose = require('mongoose');
=======
>>>>>>> dfdd47ffc09e6c81906249f270270e0b237bb708
const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

<<<<<<< HEAD
router.get('/', requireAuth, async (req, res) => {
=======
// GET all students
router.get('/', async (req, res) => {
>>>>>>> dfdd47ffc09e6c81906249f270270e0b237bb708
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

<<<<<<< HEAD
router.post('/', requireAuth, async (req, res) => {
=======
// CREATE a student
router.post('/', async (req, res) => {
>>>>>>> dfdd47ffc09e6c81906249f270270e0b237bb708
  try {
    const newStudent = await Student.create(req.body);
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

<<<<<<< HEAD
router.put('/:id', requireAuth, async (req, res) => {
=======
// UPDATE a student by ID
router.put('/:id', async (req, res) => {
>>>>>>> dfdd47ffc09e6c81906249f270270e0b237bb708
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
<<<<<<< HEAD
      { new: true, runValidators: true }
=======
      { returnDocument: 'after', runValidators: true }
>>>>>>> dfdd47ffc09e6c81906249f270270e0b237bb708
    );
    if (!updatedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

<<<<<<< HEAD
router.delete('/:id', requireAuth, async (req, res) => {
=======
// DELETE a student by ID
router.delete('/:id', async (req, res) => {
>>>>>>> dfdd47ffc09e6c81906249f270270e0b237bb708
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }
<<<<<<< HEAD
    res.json({ message: 'Student deleted successfully', deletedStudent });
=======
    res.json({ message: 'Student deleted successfully' });
>>>>>>> dfdd47ffc09e6c81906249f270270e0b237bb708
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;