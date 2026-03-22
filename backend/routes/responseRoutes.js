const express = require('express');
const router = express.Router();
const Response = require('../models/Response');
const User = require('../models/User');
const Question = require('../models/Question');
const { protect, admin } = require('../middleware/authMiddleware');

// @desc    Save user response to explore question
// @route   POST /api/explore/response
router.post('/response', protect, async (req, res) => {
    const { category, question, answer } = req.body;

    const response = new Response({
        user: req.user._id,
        category,
        question,
        answer
    });

    const savedResponse = await response.save();
    res.status(201).json(savedResponse);
});

// @desc    Get all user responses
// @route   GET /api/explore/admin/responses
router.get('/admin/responses', protect, admin, async (req, res) => {
    const responses = await Response.find({}).populate('user', 'name mobile');
    res.json(responses);
});

// @desc    Get aggregated stats for a category
router.get('/stats/:category', protect, async (req, res) => {
    try {
        const { category } = req.params;
        const allResponses = await Response.find({ category });
        const questions = await Question.find({ category });
        const userResponses = await Response.find({ category, user: req.user._id }).sort({ createdAt: -1 });

        // Aggregate stats starting with all questions/options from DB
        const stats = {};
        questions.forEach(q => {
            stats[q.text] = {};
            q.options.forEach(opt => {
                stats[q.text][opt] = 0;
            });
        });

        allResponses.forEach(r => {
            if (stats[r.question] && stats[r.question][r.answer] !== undefined) {
                stats[r.question][r.answer] += 1;
            }
        });

        // Convert to percentages
        const resultStats = {};
        Object.keys(stats).forEach(q => {
            const total = Object.values(stats[q]).reduce((a, b) => a + b, 0);
            resultStats[q] = {};
            Object.keys(stats[q]).forEach(opt => {
                resultStats[q][opt] = total > 0 ? Math.round((stats[q][opt] / total) * 100) : 0;
            });
        });

        res.json({
            stats: resultStats,
            userResponse: userResponses[0] || null
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get admin summary stats
router.get('/admin/summary', protect, admin, async (req, res) => {
    try {
        const allResponses = await Response.find({});
        const questions = await Question.find({});
        const totalUsers = await User.countDocuments({ role: 'user' });
        const totalQuestions = questions.length;
        
        // Category distribution (Unique users per category)
        const categoryCounts = {};
        const userCategoryMap = new Set();
        allResponses.forEach(r => {
            const key = `${r.user}-${r.category}`;
            if (!userCategoryMap.has(key)) {
                userCategoryMap.add(key);
                categoryCounts[r.category] = (categoryCounts[r.category] || 0) + 1;
            }
        });

        // Initialize questionStats with all questions and their options
        const questionStats = {};
        questions.forEach(q => {
            if (!questionStats[q.category]) questionStats[q.category] = {};
            questionStats[q.category][q.text] = {};
            q.options.forEach(opt => {
                questionStats[q.category][q.text][opt] = 0;
            });
        });

        // Detailed question stats: fill in counts from responses
        allResponses.forEach(r => {
            if (questionStats[r.category] && questionStats[r.category][r.question]) {
                questionStats[r.category][r.question][r.answer] = (questionStats[r.category][r.question][r.answer] || 0) + 1;
            }
        });

        res.json({
            totalResponses: allResponses.length,
            totalUsers,
            totalQuestions,
            categoryCounts,
            questionStats
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
