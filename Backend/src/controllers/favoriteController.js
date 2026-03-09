const Favorite = require('../models/Favorite.model');

// @desc    Add movie/show to favorites
// @route   POST /api/favorites
exports.addFavorite = async (req, res) => {
    try {
        const { tmdbId, title, posterPath, mediaType } = req.body;

        // Check if already in favorites
        const alreadyExists = await Favorite.findOne({ userId: req.user._id, tmdbId });
        if (alreadyExists) {
            return res.status(400).json({ message: 'Already in favorites' });
        }

        const favorite = await Favorite.create({
            userId: req.user._id,
            tmdbId,
            title,
            posterPath,
            mediaType
        });

        res.status(201).json(favorite);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all user favorites
// @route   GET /api/favorites
exports.getFavorites = async (req, res) => {
    try {
        const favorites = await Favorite.find({ userId: req.user._id });
        res.json(favorites);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Remove from favorites
// @route   DELETE /api/favorites/:tmdbId
exports.removeFavorite = async (req, res) => {
    try {
        const favorite = await Favorite.findOneAndDelete({ 
            userId: req.user._id, 
            tmdbId: req.params.tmdbId 
        });

        if (!favorite) {
            return res.status(404).json({ message: 'Favorite not found' });
        }

        res.json({ message: 'Removed from favorites' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};