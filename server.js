const express = require('express');
const session = require('express-session');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 4000;
const gamesController = require('./controllers/gamesController');
const usersController = require('./controllers/usersController');
const reviewsController = require('./controllers/reviewsController');
const db = require('./models');
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 3600 * 48,
    },
  })
);

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

function checkAccessLink(req,res,next) {
  req.accessUrl = '/users/logout';
  req.accessText = 'Logout';
  if (! req.session.currentUser) {
    req.accessUrl='/users/login';
    req.accessText='Login';
  };
  next();
};

app.use(checkAccessLink);
app.use('/games', gamesController);
app.use('/users', usersController);
app.use('/reviews', reviewsController);

/////////Dummy Data
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

app.get('/', async (req, res) => {
//   const allGames= await db.Game.find().populate('reviews');
//   let allGameRatings=[];
//   let allGamesWithReviews=[];

//   allGames.forEach(currentGame =>{
//     let ratingSum=0;
//     if (currentGame.reviews.length>0) {
//       allGamesWithReviews.push(currentGame);
//     };
//     currentGame.reviews.forEach(element=>{
//       ratingSum+=element.rating;
//     });
//     const averageRating=ratingSum/currentGame.reviews.length;
//     const currentGameObj={
//       name: currentGame.name,
//       id: currentGame._id,
//       image: currentGame.image,
//       avgRating: averageRating,
//     };
//     allGameRatings.push(currentGameObj);
//   });
  
//   // reference for sorting: https://www.javascripttutorial.net/array/javascript-sort-an-array-of-objects/
//   const sortedGames = allGameRatings.sort((a,b)=>{
//     return b.avgRating-a.avgRating;
//   });
//   let maxTopGames=9;
//   let topNineGames=[];
//   for (let i=0; i<maxTopGames; i++) {
//     topNineGames.push(sortedGames[i]);
//   };

//   const allUsers= await db.User.find();
//   let allUserReviewsCount=[];

//   allUsers.forEach(currentUser =>{
//     const currentUserObj={
//       username: currentUser.username,
//       id: currentUser._id,
//       profilePic: currentUser.profilePic,
//       numReviews: currentUser.reviews.length,
//     };
//     allUserReviewsCount.push(currentUserObj);
//   });

//   const sortedUsers = allUserReviewsCount.sort((a,b)=>{
//     return b.numReviews-a.numReviews;
//   });
//   let maxTopUsers=5;
//   if (sortedUsers.length<maxTopUsers) {
//     maxTopUsers=sortedUsers.length;
//   };
//   let topFiveUsers=[];
//   for (let i=0; i<maxTopUsers; i++) {
//     topFiveUsers.push(sortedUsers[i]);
//   };

//   const randomNumberGame= Math.floor(Math.random()*allGamesWithReviews.length);
//   const randomNumberReview=Math.floor(Math.random()*allGamesWithReviews[randomNumberGame].reviews.length);
//   const randomGameObj={
//     name: allGamesWithReviews[randomNumberGame].name,
//     review: allGamesWithReviews[randomNumberGame].reviews[randomNumberReview].review,
//     rating: allGamesWithReviews[randomNumberGame].reviews[randomNumberReview].rating,
//     id: allGamesWithReviews[randomNumberGame]._id,
//     image: allGamesWithReviews[randomNumberGame].image,
//   };

//   res.render('home.ejs', {
//     accessUrl: req.accessUrl,
//     accessText: req.accessText,
//     topNineGames: topNineGames,
//     topFiveUsers: topFiveUsers,
//     randomGame: randomGameObj,
//   });
// });

// app.get('*', (req, res, next) => {
//   const error = new Error();
//   error.statusCode = 404;
//   next(error);
// });

// app.use((err, req, res, next) => {
//   let message = 'Something went wrong.';
//   if (!err.statusCode) err.statusCode = 500;
//   if (err.statusCode === 400) {
//     res.status(400);
//     message = 'Looks like you missed a required field. Try again.';
//   } else if (err.statusCode === 404) {
//     res.status(404);
//     message = "That page doesn't exist.";
//   } else if (err.statusCode === 401) {
//     res.status(401);
//     message = 'Not Authorized';
//   }
//   res.render('error', {
//     message: message,
//     accessUrl: req.accessUrl,
//     accessText: req.accessText,
//   });
res.send('got it');
});

app.listen(PORT, () => {
  console.log(`Server Active: http://localhost:${PORT}`);
});