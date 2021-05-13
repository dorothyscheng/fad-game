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

// // Update a user's status to admin
// db.User.findOneAndUpdate(
//     {username: 'F'},
//     {$set:{isAdmin: true}},
//     (err,updatedUser)=>console.log(updatedUser)
// );


////////////////////////////////////////////ROUTES
// Home
app.get('/', async (req, res) => {
  // Find top rated games
  const allGames= await db.Game.find().populate('reviews');
  let allGameRatings=[];
  allGames.forEach(currentGame =>{
    let ratingSum=0;
    currentGame.reviews.forEach(element=>{
      ratingSum+=element.rating;
    });
    const averageRating=ratingSum/currentGame.reviews.length;
    const currentGameObj={
      name: currentGame.name,
      id: currentGame._id,
      image: currentGame.image,
      avgRating: averageRating,
    };
    allGameRatings.push(currentGameObj);  
  });
  // reference for sorting: https://www.javascripttutorial.net/array/javascript-sort-an-array-of-objects/
  const sortedGames = allGameRatings.sort((a,b)=>{
    return b.avgRating-a.avgRating;
  });
  let maxTopGames=4; // we want to display the top 4 games
  if (sortedGames.length<maxTopGames) {
    maxTopGames=sortedGames.length; // but if there are fewer than 4 games in the db, only send what is in db
  };
  let topFourGames=[];
  for (let i=0; i<maxTopGames; i++) {
    topFourGames.push(sortedGames[i]);
  };
  // Find users with the most reviews
  const allUsers= await db.User.find();
  let allUserReviewsCount=[];
  allUsers.forEach(currentUser =>{
    const currentUserObj={
      username: currentUser.username,
      id: currentUser._id,
      profilePic: currentUser.profilePic,
      numReviews: currentUser.reviews.length,
    };
    allUserReviewsCount.push(currentUserObj);  
  });
  const sortedUsers = allUserReviewsCount.sort((a,b)=>{
    return b.numReviews-a.numReviews;
  });
  let maxTopUsers=4; // we want to display the top 4 users
  if (sortedUsers.length<maxTopUsers) {
    maxTopUsers=sortedUsers.length; // but if there are fewer than 4 users in the db, only send what is in db
  };
  let topFourUsers=[];
  for (let i=0; i<maxTopUsers; i++) {
    topFourUsers.push(sortedUsers[i]);
  };


  res.render('home.ejs', {
    accessUrl: req.accessUrl,
    accessText: req.accessText,
    topFourGames: topFourGames,
    topFourUsers: topFourUsers,
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
