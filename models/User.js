const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: Number,
  profilePic: {
    type: String,
    default:
      'https://icon-library.com/images/generic-user-icon/generic-user-icon-19.jpg',
  },
  preferredGenre: String,
  isAdmin: { type: Boolean, default: false },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
