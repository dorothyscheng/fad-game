const mongoose = require('mongoose');
const connect = process.env.MONGODB_URI || 'mongodb://localhost:27017/FAD-Games';
mongoose.connect(connect, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
mongoose.connection.on('connected', () => {
  console.log(`Welcome aboard! All systems online.`);
});
mongoose.connection.on('disconnected', () => {
  console.log('WARNING: Mongoose Disconnected!');
});
mongoose.connection.on('error', (err) => {
  console.log('ALERT! Error:', err);
});
module.exports = {
  Game: require('./Game'),
  Review: require('./Review'),
  User: require('./User'),
};