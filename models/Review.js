const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  game: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game',
  },
  rating: {type: Number, required: true},
  review: String,
});
const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;