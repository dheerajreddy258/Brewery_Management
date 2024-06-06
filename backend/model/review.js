const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    publishedOn: {
        type: Date,
        default: Date.now
    },
    itemId: {
        type: String,
        req: true
    }, description: {
        type: String,
        req: true
    }
});

module.exports = mongoose.model('Review', reviewSchema);
