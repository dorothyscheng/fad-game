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
  image: {type: String, default: 'https://www.crossfitgrandview.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png'},
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