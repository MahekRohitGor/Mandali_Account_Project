const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require("../middleware/authMiddleware");
const User = require('../models/User');
const mongoose = require("mongoose");
require('dotenv').config();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.get('/portfolio', authMiddleware, async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.user.id);
        const user = await User.findById(userId).select('-password');
        // console.log(`User ${user}`);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user.portfolio);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;