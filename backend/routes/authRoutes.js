const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Register a new user
// @route   POST /api/auth/signup
router.post('/signup', async (req, res) => {
    try {
        const { name, age, gender, city, occupation, mobile, password, role } = req.body;

        const userExists = await User.findOne({ mobile });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            name, age, gender, city, occupation, mobile, password, role
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                mobile: user.mobile,
                role: user.role,
                age: user.age,
                gender: user.gender,
                city: user.city,
                occupation: user.occupation,
                token: generateToken(user._id)
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error(`Signup Error: ${error.message}`);
        res.status(500).json({ message: 'Server error during signup', error: error.message });
    }
});

// @desc    Auth user & get token
// @route   POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { mobile, password } = req.body;

        const user = await User.findOne({ mobile });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                mobile: user.mobile,
                role: user.role,
                age: user.age,
                gender: user.gender,
                city: user.city,
                occupation: user.occupation,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ message: 'Invalid mobile or password' });
        }
    } catch (error) {
        console.error(`Login Error: ${error.message}`);
        res.status(500).json({ message: 'Server error during login', error: error.message });
    }
});

module.exports = router;
