const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Game'
    }
  ],
  age: Number,
  profilePic: String,
  preferredGenre: String,
  isAdmin: Boolean,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
