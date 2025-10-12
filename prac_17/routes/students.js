const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// GET all students (API)
router.get('/api/students', async (req, res) => {
    try {
        const students = await Student.find().sort({ createdAt: -1 });
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET single student (API)
router.get('/api/students/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST create student (API)
router.post('/api/students', async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).json(student);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// PUT update student (API)
router.put('/api/students/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json(student);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE student (API)
router.delete('/api/students/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Web routes for UI
router.get('/', async (req, res) => {
    try {
        const students = await Student.find().sort({ createdAt: -1 });
        res.render('index', { students });
    } catch (error) {
        res.status(500).render('error', { error: error.message });
    }
});

router.get('/add', (req, res) => {
    res.render('add');
});

router.get('/edit/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).render('error', { error: 'Student not found' });
        }
        res.render('edit', { student });
    } catch (error) {
        res.status(500).render('error', { error: error.message });
    }
});

router.post('/add', async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.redirect('/');
    } catch (error) {
        res.render('add', { error: error.message });
    }
});

router.put('/edit/:id', async (req, res) => {
    try {
        await Student.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/');
    } catch (error) {
        const student = await Student.findById(req.params.id);
        res.render('edit', { student, error: error.message });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (error) {
        res.status(500).render('error', { error: error.message });
    }
});

module.exports = router;