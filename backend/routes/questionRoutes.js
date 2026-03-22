const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const { protect, admin } = require('../middleware/authMiddleware');

// @desc    Add a new question
// @route   POST /api/questions
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
    const { category, text, options } = req.body;

    if (!category || !text || !options || !Array.isArray(options)) {
        return res.status(400).json({ message: 'Please provide all fields and options as an array' });
    }

    const question = new Question({
        category,
        text,
        options
    });

    const savedQuestion = await question.save();
    res.status(201).json(savedQuestion);
});

// @desc    Get questions by category
// @route   GET /api/questions/:category
// @access  Public
router.get('/:category', async (req, res) => {
    const questions = await Question.find({ category: req.params.category });
    res.json(questions);
});

module.exports = router;
