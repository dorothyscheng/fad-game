const PORT = 4000;
const express = require('express');
const session = require('express-session');
const app = express();
const gamesController = require('./controllers/gamesController');
const usersController = require('./controllers/usersController');
const reviewsController = require('./controllers/reviewsController');
// const designerController = require('./controllers/designerController'); //STRETCH
const db = require('./models');
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
const secret = require('./secret');
app.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 3600 * 48,
    },
  })
);

/////////////////CSS
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
// Check if user is logged in and update login/logout link in nav partial
function checkAccessLink(req,res,next) {
  req.accessUrl = '/users/logout';
  req.accessText = 'Logout';
  if (! req.session.currentUser) {
    req.accessUrl='/users/login'
    req.accessText='Login';
  };
  next();
};
app.use(checkAccessLink);

////////////////////////////////////////////

app.use('/games', gamesController);
app.use('/users', usersController);
app.use('/reviews', reviewsController);

// ///////////Dummy Data
// const tempGames = require('./models/tempGames');
// db.Game.create(tempGames,(err,allGames) => {
//     if (err) return console.log(err);
//     console.log(allGames);
// });

// Update a user's status to admin
// db.User.findOneAndUpdate(
//     {username: 'Dorothy'},
//     {$set:{isAdmin: true}},
//     (err,updatedUser)=>console.log(updatedUser)
// );


////////////////////////////////////////////ROUTES
// Home
app.get('/', (req, res) => {
  res.render('home.ejs', {
    accessUrl: req.accessUrl,
    accessText: req.accessText,
  });
});
// Catch-all
app.get('*', (req, res, next) => {
  const error = new Error();
  error.statusCode = 404;
  next(error);
});
// Error handler
app.use((err, req, res, next) => {
  let message = 'Something went wrong.';
  if (!err.statusCode) err.statusCode = 500;
  if (err.statusCode === 400) {
    res.status(400);
    message = 'Looks like you missed a required field. Try again.';
  } else if (err.statusCode === 404) {
    res.status(404);
    message = "That page doesn't exist.";
  } else if (err.statusCode === 401) {
    res.status(401);
    message = 'Not Authorized';
  }
  res.render('error', {
    message: err.toString(),
    accessUrl: req.accessUrl,
    accessText: req.accessText,
  });
});
////////////////////////////////////////////
app.listen(PORT, () => {
  console.log(`Server Active: http://localhost:${PORT}`);
});
