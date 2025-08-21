const mongoose = require('mongoose');
const showSchema = new mongoose.Schema({
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
const Show = mongoose.model('Show', showSchema);
module.exports = Show;