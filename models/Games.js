const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    name: {type: String, required: true, minLength: 1},
    description: String,
    numPlayers: {
        min: {type: Number, min: 1},
        max: Number
        },
    ageRating: {
        min: {type: Number, min: 1},
        max: Number
        },
    playTime: {
        min: {type: Number, min: 1},
        max: Number
        },
    designer: [String],
    image: String,
    userRatings: [Number],
    genre: [String]
});


const Game = mongoose.model('Game', gameSchema);

module.exports = Game;