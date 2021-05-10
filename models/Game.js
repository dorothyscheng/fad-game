const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 1 },
  description: String,
  numPlayers: {
    min: { type: Number, min: 1 },
    max: Number,
  },
  ageRating: { type: Number, min: 1 },
  playTime: {
    min: { type: Number, min: 1 },
    max: Number,
  },
  designer: [String],
  image: String,
  genre: [String],
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
