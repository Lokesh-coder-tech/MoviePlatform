const express = require('express');
const router = express.Router();

// 1. Import the guard (middleware)
const { protect } = require('../middlewares/authMiddleware');

// 2. Import the actual logic from your controller
const { 
    addFavorite, 
    getFavorites, 
    removeFavorite 
} = require('../controllers/favoriteController');

/**
 * @route   GET /api/favorites
 * @desc    Get all favorite movies/shows for the logged-in user
 * @access  Private
 */
router.get('/', protect, getFavorites);

/**
 * @route   POST /api/favorites/add
 * @desc    Add a movie/show to favorites
 * @access  Private
 */
router.post('/add', protect, addFavorite);

/**
 * @route   DELETE /api/favorites/:tmdbId
 * @desc    Remove a movie/show from favorites using its TMDB ID
 * @access  Private
 */
router.delete('/:tmdbId', protect, removeFavorite);

module.exports = router;