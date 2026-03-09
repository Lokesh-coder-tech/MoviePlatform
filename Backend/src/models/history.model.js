const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tmdbId: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    posterPath: {
        type: String,
        required: true
    },
    mediaType: {
        type: String,
        enum: ['movie', 'tv'],
        required: true
    },
    watchedAt: {
        type: Date,
        default: Date.now // This helps in sorting by "Recently Watched"
    }
}, { timestamps: true });

// We allow duplicate tmdbId here because a user might watch a movie multiple times,
// but usually, we just update the timestamp.
module.exports = mongoose.model('History', historySchema);