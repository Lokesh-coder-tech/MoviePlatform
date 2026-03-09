const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    posterImageUrl: { type: String, required: true },
    description: { type: String, required: true },
    movieId: { type: String, required: true, unique: true }, // Custom ID for admin movies
    releaseDate: { type: Date, required: true },
    trailerYoutubeLink: { type: String, required: true },
    genre: { type: String, required: true },
    category: { type: String, required: true } // e.g., 'Trending', 'Popular'
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);