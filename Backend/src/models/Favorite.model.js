const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tmdbId: {
        type: Number, // The ID from TMDB API
        required: true
    },
    title: {
        type: String,
        required: true
    },
    posterPath: {
        type: String, // The /path.jpg from TMDB
        required: true
    },
    mediaType: {
        type: String,
        enum: ['movie', 'tv'],
        required: true
    }
}, { timestamps: true });

// Prevent a user from adding the same movie to favorites twice
favoriteSchema.index({ userId: 1, tmdbId: 1 }, { unique: true });

module.exports = mongoose.model('Favorite', favoriteSchema);