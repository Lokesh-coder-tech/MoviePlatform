const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { addToHistory, getHistory } = require('../controllers/historyController');

router.route('/')
    .get(protect, getHistory)
    .post(protect, addToHistory);

module.exports = router;