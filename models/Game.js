const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 1 },
  description: {type: String, default: 'No description provided'},
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
  image: {type: String, default: 'https://www.jing.fm/clipimg/full/19-195367_board-game-clip-art-black-and-white-board.png'},
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
