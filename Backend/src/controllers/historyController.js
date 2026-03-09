const History = require('../models/history.model');

// @desc    Add movie to watch history
// @route   POST /api/history
exports.addToHistory = async (req, res) => {
    try {
        const { tmdbId, title, posterPath, mediaType } = req.body;

        // Find and update if exists, otherwise create new (upsert)
        const history = await History.findOneAndUpdate(
            { userId: req.user._id, tmdbId },
            { title, posterPath, mediaType, watchedAt: Date.now() },
            { upsert: true, new: true }
        );

        res.status(200).json(history);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user watch history (sorted by latest)
// @route   GET /api/history
exports.getHistory = async (req, res) => {
    try {
        const history = await History.find({ userId: req.user._id })
            .sort({ watchedAt: -1 }) // Newest first
            .limit(20); // Keep it performant
        res.json(history);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};