const mongoose = require('mongoose');
const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 10,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;