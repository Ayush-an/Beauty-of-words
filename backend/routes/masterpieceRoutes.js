const express = require('express');
const router = express.Router();
const Masterpiece = require('../models/Masterpiece');
const { protect, admin } = require('../middleware/authMiddleware');

// @desc    Create a new masterpiece
// @route   POST /api/masterpieces
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
    const { title, category, content } = req.body;

    if (!title || !category || !content) {
        return res.status(400).json({ message: 'Please provide all fields' });
    }

    const masterpiece = new Masterpiece({
        user: req.user._id,
        title,
        category,
        content
    });

    const createdMasterpiece = await masterpiece.save();
    res.status(201).json(createdMasterpiece);
});

// @desc    Get all masterpieces
// @route   GET /api/masterpieces
// @access  Public
router.get('/', async (req, res) => {
    const masterpieces = await Masterpiece.find({}).populate('user', 'name');
    res.json(masterpieces);
});

module.exports = router;
