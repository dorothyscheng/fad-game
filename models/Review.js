const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  username: {
    type: mongoose.Schema.Type.ObjectId,
    ref: 'User',
  },
  rating: Number,
  review: String,
  game: {
    type: mongoose.Schema.Type.ObjectId,
    ref: 'Game',
  },
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
